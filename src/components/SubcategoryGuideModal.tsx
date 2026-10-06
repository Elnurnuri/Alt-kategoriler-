import React from 'react';
import { X, Check, ArrowRight, Laptop, Headphones, Watch, Camera } from 'lucide-react';
import { Subcategory } from '../types';

interface SubcategoryGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  subcategories: Subcategory[];
  onSelectSubcategory: (subcatId: string) => void;
}

export const SubcategoryGuideModal: React.FC<SubcategoryGuideModalProps> = ({
  isOpen,
  onClose,
  subcategories,
  onSelectSubcategory
}) => {
  if (!isOpen) return null;

  const guideRecommendations = [
    {
      title: 'Taşınabilir İş & Kodlama',
      bestSubcatId: 'bilgisayar-laptop',
      subcatName: 'Dizüstü Bilgisayarlar',
      desc: 'Sürekli hareket halinde olanlar için hafiflik (1.4kg altı), 16+ saat gerçek pil ömrü ve yüksek PPI Retina/OLED ekran öncelikli olmalıdır.',
      keySpecs: 'M3 / Intel Ultra, 32GB RAM, 1TB SSD',
      icon: Laptop
    },
    {
      title: 'Odaklanma & Seyahat Sesi',
      bestSubcatId: 'ses-kulaklik',
      subcatName: 'Ses & ANC Kulaklık',
      desc: 'Ofis uğultusu ve uçak motoru sesini kesmek için hibrit aktif gürültü engelleme (ANC) ve LDAC/aptX yüksek çözünürlüklü ses kodekleri.',
      keySpecs: '30+ saat pil, çok noktalı bağlantı, 40mm dinamik sürücü',
      icon: Headphones
    },
    {
      title: 'Sağlık, Spor & Telemetri',
      bestSubcatId: 'akilli-saat',
      subcatName: 'Akıllı Saat & Giyilebilir',
      desc: 'Zorlu antrenmanlarda telefon taşımadan rota kaydı ve nabız/SpO2/EKG takibi için çift frekanslı GPS ve titanyum gövde.',
      keySpecs: 'Safir kristal cam, 100m su dayanımı, çoklu uydu',
      icon: Watch
    },
    {
      title: 'Sinematik Video & İçerik Üretimi',
      bestSubcatId: 'fotograf-kamera',
      subcatName: 'Fotoğraf, Video & Sinema',
      desc: 'Yüksek dinamik aralık (14+ stop), 4K 10-bit 4:2:2 kayıt ve gövde içi görüntü sabitleme (IBIS) ile profesyonel sinematik sonuçlar.',
      keySpecs: 'Full-Frame BSI sensör, f/1.2 - f/1.4 prime lensler',
      icon: Camera
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-neutral-50/50">
          <div>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              Rehber & Danışman
            </span>
            <h2 className="text-xl font-bold text-neutral-900 font-heading">
              Alt Kategori Satın Alma & Tercih Kılavuzu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-sm text-neutral-600 leading-relaxed">
            Hangi kategorideki ürünlerin ihtiyaçlarınıza en iyi şekilde cevap vereceğinden emin değil misiniz?
            Aşağıdaki senaryo analizlerine göz atarak doğrudan ilgili alt kategoriye geçiş yapabilirsiniz.
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guideRecommendations.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-white transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="p-2 bg-neutral-100 text-neutral-900 rounded-lg">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                          {item.subcatName}
                        </span>
                        <h4 className="text-sm font-bold text-neutral-900 font-heading">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100 text-[11px] text-neutral-700 mb-4">
                      <span className="font-semibold text-neutral-900 block mb-0.5">
                        Önerilen Donanım Dengesi:
                      </span>
                      <span>{item.keySpecs}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectSubcategory(item.bestSubcatId);
                      onClose();
                    }}
                    className="w-full py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Bu Alt Kategoriyi İncele</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Tips Section */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 font-heading">
              Garantili ve Orijinal Ürün Taahhüdü
            </h4>
            <ul className="text-xs text-neutral-600 space-y-1.5">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Katalogdaki tüm cihazlar doğrudan resmi Türkiye distribütör garantisi altındadır.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Siparişleriniz saat 16:00'ya kadar aynı gün özenle sigortalı kargo ile sevk edilir.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>14 gün boyunca koşulsuz iade ve teknik destek hakkı saklıdır.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Pencereyi Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
