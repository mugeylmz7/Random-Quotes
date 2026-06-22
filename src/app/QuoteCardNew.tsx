import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { Quote, QuotesContext } from "@/app/QuotesContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { deleteQuote } from "./actions/deleteQuote";
import { useState, useContext, useEffect } from "react";
import { editQuote } from "./actions/editQuote";
import { Input } from "@/components/ui/input"; // Shadcn UI Input bileşenin varsa
import { Textarea } from "@/components/ui/textarea"; // Shadcn UI Textarea bileşenin varsa
import { motion } from "framer-motion";

interface QuoteCardProps {
  currentQuote: Quote;
  handleLikeQuote: (quote: Quote) => void;
  handleUnlikeQuote: (quote: Quote) => void;
  handleNextQuote: () => void;
}

export function QuoteCard({
  handleNextQuote,
  handleUnlikeQuote,
  handleLikeQuote,
  currentQuote,
}: QuoteCardProps) {
  const { user } = useUser();
  const isLiked = currentQuote.likedBy?.includes(user?.sub as string);

  // Yetkilendirme: Sözün sahibi mi? (Bu bilgiye sahip olmak, örneğin silme veya düzenleme butonlarını göstermek için önemli olabilir)
  const isOwner =
    user?.sub && currentQuote.createdBy && user.sub === currentQuote.createdBy;

  // --- Düzenleme durumu (state) ---
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuote, setEditedQuote] = useState(currentQuote.quote);
  const [editedAuthor, setEditedAuthor] = useState(currentQuote.author);
  const [editedCategory, setEditedCategory] = useState(
    currentQuote.category || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  // Context'ten yeni yaptığımız yenileme fonksiyonunu çekiyoruz:
  const { fetchData } = useContext(QuotesContext);

  // Kaydetme Fonksiyonu
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await editQuote(currentQuote._id!.toString(), {
        quote: editedQuote,
        author: editedAuthor,
        category: editedCategory,
      });
      await fetchData(); // Verileri yeniden çek
      setIsEditing(false); // Başarılı olursa düzenleme modundan çık
    } catch (error) {
      alert("Failed to edit quote.");
    } finally {
      setIsSaving(false);
    }
  };

  // Sıradaki söze geçildiğinde veya söz güncellendiğinde input kutularının içini senkronize edelim:
  useEffect(() => {
    setEditedQuote(currentQuote.quote);
    setEditedAuthor(currentQuote.author);
    setEditedCategory(currentQuote.category || "");
  }, [currentQuote]); // Sıradaki söze geçildiğinde kutuların içini tazelemeyi sağlar

  return (
    <Card
      size="lg"
      className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 p-6 rounded-lg shadow-sm"
    >
      <CardContent className="flex flex-col p-6">
        <div className="flex items-center justify-between w-full mb-4">
          {/* SOL TARAF: Kategori Rozeti */}
          <span className="px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
            {currentQuote.category || "Uncategorized"}
          </span>

          {/* SAĞ TARAF: Beğenme Butonu */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-600">
              {currentQuote.likedBy?.length || 0}
            </span>
            <Button
              variant={"icon"}
              size="icon"
              disabled={!user}
              onClick={() => {
                // 1. KORUMA: Eğer kullanıcı giriş yapmadıysa doğrudan Auth0 giriş sayfasına yönlendiriyoruz
                if (!user) {
                  window.location.href = "/auth/login";
                  return;
                }
                isLiked
                  ? handleUnlikeQuote(currentQuote)
                  : handleLikeQuote(currentQuote);
              }}
              className="transition-transform active:scale-125"
            >
              {isLiked ? (
                // EĞER BEĞENİLDİYSE: Üzerine gelince "Kırık Kalp" çıksın
                <Heart className="fill-red-500 text-red-500" />
              ) : (
                <Heart className="text-slate-400" />
              )}
            </Button>
          </div>
        </div>

        {/* ORTA KISIM: Söz ve Yazar */}
        <motion.div
          key={currentQuote._id?.toString() || currentQuote.quote} // Söz değiştiğinde animasyon tetiklenir
          initial={{ opacity: 0, y: 20 }} // İlk başta görünmez ve 20px aşağıda başlasın
          animate={{ opacity: 1, y: 0 }} // Animasyonu tetikle
          transition={{ duration: 0.5, ease: "easeOut" }} // Animasyon süresi: 0.5 saniyede akıcı kaysın
          className="flex flex-col items-center justify-center w-full"
        >
          {isEditing ? (
            // DÜZENLEME MODU AÇIKKEN GÖRÜNECEK FORMLAR
            <div className="space-y-4">
              <select
                className="w-full p-2 border rounded-md dark:bg-slate-900 dark:border-slate-700 p-2 mb-4"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="Humor">Humor</option>
                <option value="Life">Life</option>
                <option value="Inspirational">Inspirational</option>
                <option value="Motivational">Motivational</option>
                <option value="Wisdom">Wisdom</option>
              </select>
              <textarea
                className="w-full p-2 border rounded-md dark:bg-slate-900 min-h-[100px] mb-4"
                value={editedQuote}
                onChange={(e) => setEditedQuote(e.target.value)}
                placeholder="Quote text"
              />
              <input
                className="w-full p-2 border rounded-md dark:bg-slate-900"
                value={editedAuthor}
                onChange={(e) => setEditedAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>
          ) : (
            // NORMAL MODDA GÖRÜNECEK METİNLER
            <>
              <H3 className="text-slate-800 dark:text-slate-100 italic text-center text-lg leading-relaxed">
                "{currentQuote.quote}"
              </H3>
              <span className="text-slate-500 dark:text-slate-400 block self-end mt-4 italic">
                — {currentQuote.author}
              </span>
            </>
          )}
        </motion.div>

        {/* ALT KISIM: Butonlar */}
        <div className="mt-8 space-y-3">
          {/* Her koşulda görünen Sıradaki Söz butonu */}
          <Button
            onClick={handleNextQuote}
            variant="outline"
            size="lg"
            className="w-full"
            disabled={isEditing} // Düzenleme yaparken yanlışlıkla sıradaki söze geçilmesin
          >
            Next Quote
          </Button>

          {/* SADECE SÖZÜN SAHİBİNE GÖRÜNECEK BUTONLAR */}
          {isOwner && (
            <div className="flex flex-col gap-2 w-full">
              {isEditing ? (
                // Eğer isEditing TRUE ise: Kaydet ve İptal butonları yan yana çıkar
                <div className="flex w-full gap-2">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-black"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsEditing(false); // Düzenlemeyi iptal et modu kapat
                      // Kutulardaki değişiklikleri geri al, eski verileri yükle
                      setEditedQuote(currentQuote.quote);
                      setEditedAuthor(currentQuote.author);
                      setEditedCategory(currentQuote.category || "");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                // Eğer isEditing FALSE ise: düzenlemek istediğin normal EDIT butonu çıksın
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsEditing(true)} // Butona basılınca isEditing TRUE olur ve üstteki form açılır!
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}

              {/* DELETE (SİLME) BUTONU (Düzenleme yaparken gizlensin diye şart koyduk) */}
              {!isEditing && (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this quote?",
                      )
                    ) {
                      try {
                        await deleteQuote(currentQuote._id!.toString());
                        handleNextQuote();
                      } catch (error) {
                        alert("Failed to delete quote.");
                      }
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
