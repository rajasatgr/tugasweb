(function () {
  'use strict';
  /* Kolom: [Indonesia, English]. Untuk menambah bahasa: tambah entri di LANGS dan satu kolom di tiap baris. */
  var LANGS = [['id', 'Bahasa Indonesia'], ['en', 'English']];
  var D = [
    ['Rimba – Hutan dan Pohon bagi Kehidupan Manusia', 'Rimba – Forests and Trees for Human Life'],
    ['Navigasi utama', 'Main navigation'], ['Bahasa', 'Language'], ['Terang', 'Light'], ['Gelap', 'Dark'],
    ['Anatomi pohon', 'Tree anatomy'], ['Manfaat', 'Benefits'], ['Aksi', 'Action'], ['Komunitas', 'Community'],
    ['Hutan menjaga kehidupan kita', 'Forests sustain our lives'],
    ['Udara bersih, air jernih, obat, pangan, dan ketenangan. Semuanya bermula dari pohon.', 'Clean air, clear water, medicine, food, and calm. It all begins with trees.'],
    ['Jelajahi pohon', 'Explore the tree'], ['Lihat manfaatnya', 'See the benefits'],
    ['daratan bumi tertutup hutan', 'of Earth’s land is covered by forest'],
    ['± <span class="cnt" data-to="10">10</span> juta ha', '± <span class="cnt" data-to="10">10</span> million ha'],
    ['hutan hilang per tahun, 2015–2020 (perkiraan FAO)', 'of forest lost per year, 2015–2020 (FAO estimate)'],
    ['1 pohon', '1 tree'], ['menopang udara, air, tanah, dan satwa', 'supports air, water, soil, and wildlife'],
    ['Anatomi satu pohon', 'Anatomy of a single tree'],
    ['Setiap bagian punya tugas. Pilih titik pada gambar atau tombol di samping untuk melihat fungsinya.', 'Every part has a job. Pick a dot on the picture or a button beside it to see what it does.'],
    ['Ilustrasi pohon dengan kanopi, batang, akar, dan irisan tanah', 'Illustration of a tree with canopy, trunk, roots, and a soil cross-section'],
    ['Bagian pohon', 'Tree parts'], ['Pilih bagian pohon', 'Choose a part of the tree'],
    ['Penjelasan akan muncul di sini.', 'The explanation will appear here.'],
    ['Penampang batang', 'Trunk cross-section'],
    ['Potongan melintang batang pohon dengan lingkar tahun', 'Cross-section of a tree trunk showing growth rings'],
    ['Lapisan batang', 'Trunk layers'],
    ['Tujuh manfaat hutan bagi manusia', 'Seven ways forests benefit people'],
    ['Dari iklim sampai budaya, hutan bekerja diam-diam di belakang kehidupan sehari-hari.', 'From climate to culture, forests quietly work behind everyday life.'],
    ['Mengatur iklim dan udara', 'Regulating climate and air'],
    ['Pohon menyerap karbon dioksida dan menyimpannya di batang, akar, dan tanah. Saat hutan terbakar atau ditebang, karbon itu kembali ke atmosfer. Penguapan dari daun juga mendinginkan udara sekitar.', 'Trees absorb carbon dioxide and store it in trunks, roots, and soil. When forests burn or are cut down, that carbon returns to the atmosphere. Evaporation from leaves also cools the surrounding air.'],
    ['Menjaga air dan tanah', 'Protecting water and soil'],
    ['Akar membuat air hujan meresap, menahan longsor, dan mengisi mata air.', 'Roots let rainwater soak in, hold back landslides, and refill springs.'],
    ['Rumah makhluk hidup', 'Home to living things'],
    ['Sebagian besar spesies darat hidup di hutan, dari penyerbuk sampai pengurai.', 'Most land species live in forests, from pollinators to decomposers.'],
    ['Pangan dan obat', 'Food and medicine'],
    ['Buah, madu, sagu, getah, dan tumbuhan obat. Aspirin bermula dari kulit pohon willow.', 'Fruit, honey, sago, sap, and medicinal plants. Aspirin began with willow bark.'],
    ['Mata pencaharian', 'Livelihoods'],
    ['Petani agroforestri, penyadap getah, dan pemandu wisata hidup dari hutan.', 'Agroforestry farmers, sap tappers, and tour guides make a living from forests.'],
    ['Kesehatan fisik dan mental', 'Physical and mental health'],
    ['Berjalan di hutan berkaitan dengan stres dan tekanan darah yang lebih rendah. Di Jepang kebiasaan ini disebut <i>shinrin-yoku</i>, atau “mandi hutan”.', 'Walking in forests is linked to lower stress and blood pressure. In Japan the practice is called <i>shinrin-yoku</i>, or “forest bathing”.'],
    ['Budaya dan spiritual', 'Culture and spirituality'],
    ['Bagi banyak masyarakat adat, hutan adalah tempat leluhur, sumber pengetahuan, dan bagian dari jati diri. Pengetahuan mereka tentang tumbuhan dan musim sering menjadi kunci pengelolaan hutan yang lestari.', 'For many Indigenous peoples, the forest is the home of ancestors, a source of knowledge, and part of identity. Their knowledge of plants and seasons is often the key to sustainable forest management.'],
    ['Apa yang bisa kita lakukan', 'What we can do'],
    ['Penyebab utama hilangnya hutan adalah pembukaan lahan untuk pertanian, perkebunan, dan tambang. Pilihan sehari-hari tetap berarti.', 'The main cause of forest loss is clearing land for farming, plantations, and mining. Everyday choices still matter.'],
    ['Tanam dan rawat', 'Plant and nurture'],
    ['Pilih pohon yang cocok dengan wilayahmu, lalu rawat sampai tumbuh.', 'Choose trees suited to your area, then care for them until they grow.'],
    ['Pilih produk bijak', 'Choose products wisely'],
    ['Cari kayu dan kertas bersertifikat, dan kurangi kertas sekali pakai.', 'Look for certified wood and paper, and cut back on single-use paper.'],
    ['Dukung penjaga hutan', 'Support forest guardians'],
    ['Dukung masyarakat adat dan lembaga restorasi yang bekerja di lapangan.', 'Support Indigenous communities and restoration groups working on the ground.'],
    ['Jaga ruang hijau', 'Protect green spaces'],
    ['Pertahankan taman dan pohon di sekitar tempat tinggalmu.', 'Keep the parks and trees around where you live.'],
    ['Angka pada halaman ini adalah perkiraan umum. Untuk data terbaru, periksa laporan FAO dan lembaga kehutanan resmi.', 'Figures on this page are general estimates. For the latest data, check FAO reports and official forestry agencies.'],
    /* Komunitas */
    ['Suara untuk hutan', 'A voice for the forest'],
    ['Tunjukkan dukunganmu, pilih janji kecil, lalu tulis pesan untuk hutan dan pohon.', 'Show your support, pick a small pledge, then write a message to the forests and trees.'],
    ['Dukung hutan', 'Support the forest'], ['Janji kecilku', 'My small pledges'], ['Komentar', 'Comments'],
    ['Nama', 'Name'], ['Boleh nama panggilan', 'A nickname is fine'], ['Pesanmu untuk hutan', 'Your message to the forest'],
    ['Tulis harapan, cerita, atau ajakan...', 'Write a hope, a story, or an invitation...'], ['Kirim komentar', 'Send comment'],
    ['Dukungan dan komentar disimpan di peramban ini saja, belum dibagikan ke pengunjung lain.', 'Support and comments are saved in this browser only and are not shared with other visitors.'],
    ['Saya dukung hutan', 'I support the forest'], ['Terima kasih, kamu mendukung hutan', 'Thank you, you support the forest'],
    ['Menanam pohon', 'Plant trees'], ['Kurangi kertas', 'Use less paper'], ['Pilih kayu bersertifikat', 'Choose certified wood'],
    ['Hutan kecilmu: {n} pohon dari dukungan dan janjimu.', 'Your little forest: {n} trees from your support and pledges.'],
    ['Hutan kecilmu masih kosong. Mulai dari satu dukungan.', 'Your little forest is still empty. Start with one show of support.'],
    ['Belum ada komentar. Jadilah yang pertama menulis untuk hutan.', 'No comments yet. Be the first to write for the forest.'],
    ['🌱 Setuju', '🌱 Agree'], ['Hapus', 'Delete'],
    /* Bagian pohon */
    ['Daun dan tajuk', 'Leaves and canopy'], ['Tempat fotosintesis berlangsung.', 'Where photosynthesis takes place.'],
    ['Menyerap karbon dioksida dan melepas oksigen', 'Absorb carbon dioxide and release oxygen'],
    ['Menguapkan air sehingga udara sekitar lebih sejuk', 'Evaporate water, cooling the air around them'],
    ['Menyaring debu dari udara', 'Filter dust from the air'],
    ['Cabang dan satwa', 'Branches and wildlife'], ['Tajuk adalah rumah bagi burung, serangga, dan mamalia.', 'The canopy is home to birds, insects, and mammals.'],
    ['Lebah dan kupu-kupu menyerbuki bunga', 'Bees and butterflies pollinate flowers'],
    ['Burung dan kelelawar menyebarkan biji', 'Birds and bats spread seeds'],
    ['Buah dan nektar menjadi pangan satwa dan manusia', 'Fruit and nectar feed wildlife and people'],
    ['Batang', 'Trunk'], ['Penyangga pohon sekaligus gudang karbon.', 'Holds the tree up and doubles as a carbon store.'],
    ['Menyimpan karbon selama puluhan hingga ratusan tahun', 'Stores carbon for decades to centuries'],
    ['Menjadi sumber kayu, getah, dan resin', 'Provides timber, sap, and resin'],
    ['Kulit dan getah sebagian dipakai sebagai obat tradisional', 'Some bark and sap are used in traditional medicine'],
    ['Akar', 'Roots'], ['Jangkar yang menahan pohon sekaligus tanah di sekitarnya.', 'An anchor that holds the tree and the soil around it.'],
    ['Menahan tanah dari erosi dan longsor', 'Hold soil against erosion and landslides'],
    ['Membuka pori tanah agar air hujan meresap', 'Open soil pores so rainwater soaks in'],
    ['Rambut akar halus dan jamur mikoriza memperluas area serap air dan hara', 'Fine root hairs and mycorrhizal fungi widen the area that absorbs water and nutrients'],
    ['Serasah dan tanah', 'Litter and soil'], ['Daun dan ranting gugur menjadi makanan bagi pengurai.', 'Fallen leaves and twigs become food for decomposers.'],
    ['Jamur dan bakteri mengubah serasah menjadi hara', 'Fungi and bacteria turn litter into nutrients'],
    ['Lapisan serasah menahan air seperti spons', 'The litter layer holds water like a sponge'],
    ['Tanah hutan menyimpan banyak karbon', 'Forest soil stores a lot of carbon'],
    /* Penampang batang */
    ['Kulit luar', 'Outer bark'], ['Lapisan pelindung yang sebagian besar tersusun dari sel mati.', 'A protective layer made mostly of dead cells.'],
    ['Melindungi dari api, serangga, dan benturan', 'Protects against fire, insects, and knocks'],
    ['Mengurangi penguapan air dari batang', 'Reduces water loss from the trunk'],
    ['Pola retaknya khas untuk tiap jenis pohon', 'Its crack pattern is distinctive to each tree species'],
    ['Kulit dalam (floem)', 'Inner bark (phloem)'], ['Jalur makanan pohon.', 'The tree’s food pathway.'],
    ['Mengangkut gula hasil fotosintesis dari daun ke akar dan buah', 'Carries sugar from photosynthesis from the leaves to roots and fruit'],
    ['Terus diperbarui oleh kambium dari sisi dalam', 'Constantly renewed by the cambium from the inside'],
    ['Kulit yang terkelupas melingkar sampai ke floem dapat mematikan pohon', 'Bark stripped in a ring down to the phloem can kill the tree'],
    ['Kambium', 'Cambium'], ['Lapisan sel tipis yang terus membelah.', 'A thin layer of cells that keeps dividing.'],
    ['Ke arah dalam membentuk kayu (xilem), ke arah luar membentuk floem', 'Inward it makes wood (xylem), outward it makes phloem'],
    ['Inilah yang menambah diameter batang tiap tahun', 'This is what widens the trunk each year'],
    ['Tebalnya hanya beberapa lapis sel', 'It is only a few cells thick'],
    ['Kayu gubal', 'Sapwood'], ['Kayu muda yang masih hidup dan aktif.', 'Young wood that is still alive and active.'],
    ['Mengangkut air dan mineral dari akar ke daun', 'Carries water and minerals from roots to leaves'],
    ['Menyimpan cadangan pati', 'Stores starch reserves'], ['Biasanya berwarna lebih terang', 'Usually lighter in color'],
    ['Kayu teras', 'Heartwood'], ['Kayu tua di bagian dalam yang tidak lagi mengangkut air.', 'Older wood inside that no longer carries water.'],
    ['Menopang batang agar tetap kokoh', 'Keeps the trunk strong'],
    ['Pada banyak jenis mengandung senyawa yang membuatnya gelap dan tahan lapuk', 'In many species it holds compounds that make it dark and rot-resistant'],
    ['Pohon dapat tetap hidup walau terasnya berongga', 'A tree can stay alive even with a hollow heart'],
    ['Empulur', 'Pith'], ['Jaringan lunak di pusat batang.', 'Soft tissue at the center of the trunk.'],
    ['Sisa dari tahap awal pertumbuhan tunas', 'A remnant of the shoot’s earliest growth'],
    ['Pada batang tua sering sulit dibedakan', 'In old trunks it is often hard to tell apart'],
    ['Lingkar tahun', 'Growth rings'], ['Pola lapisan kayu yang terbentuk berulang.', 'A pattern of wood layers that forms repeatedly.'],
    ['Kayu awal berwarna terang, kayu akhir lebih gelap dan rapat', 'Earlywood is light, latewood is darker and denser'],
    ['Pada daerah dengan musim tegas, satu pasang sering mewakili satu tahun', 'Where seasons are distinct, one pair often marks one year'],
    ['Di hutan tropis basah lingkarnya sering samar dan sulit dihitung', 'In wet tropical forests the rings are often faint and hard to count'],
    ['Jari-jari empulur', 'Pith rays'], ['Jaringan yang menjalar searah jari-jari, dari tengah ke kulit.', 'Tissue that runs along the radius, from center to bark.'],
    ['Menyalurkan air dan cadangan makanan secara mendatar', 'Moves water and food reserves sideways'],
    ['Menyimpan pati dan zat cadangan lain', 'Stores starch and other reserves'],
    ['Pada beberapa jenis kayu tampak sebagai garis berkilau di papan', 'In some woods they show as shiny streaks on planks']
  ];
  var M = {}, lang = 'id', i, titleId = document.title;
  D.forEach(function (r) { M[r[0]] = r; });
  try { lang = localStorage.getItem('rimba.lang') || 'id'; } catch (e) {}
  function idx() { for (i = 0; i < LANGS.length; i++) if (LANGS[i][0] === lang) return i; lang = 'id'; return 0; }
  function T(s) { var r = M[s], n = idx(); return r && r[n] ? r[n] : s; }
  window.T = T; window.LANG = function () { return lang; };

  var nav = document.querySelector('.nav'), sel = document.createElement('select');
  sel.id = 'lang'; sel.setAttribute('aria-label', 'Bahasa');
  LANGS.forEach(function (l) { var o = document.createElement('option'); o.value = l[0]; o.textContent = l[1]; sel.appendChild(o); });
  nav.insertBefore(sel, document.getElementById('mode'));

  function apply() {
    sel.value = lang; document.documentElement.lang = lang; document.title = T(titleId);
    Array.prototype.forEach.call(document.querySelectorAll('h1,h2,h3,h4,p,b,span,a,button,label,li,footer'), function (el) {
      if (el.dataset.orig === undefined) { var k = el.innerHTML.trim(); if (!M[k]) return; el.dataset.orig = k; }
      el.innerHTML = T(el.dataset.orig);
    });
    ['aria-label', 'placeholder'].forEach(function (a) {
      Array.prototype.forEach.call(document.querySelectorAll('[' + a + ']'), function (el) {
        var o = 'data-o-' + a, k = el.getAttribute(o);
        if (k === null) { k = el.getAttribute(a); if (!M[k]) return; el.setAttribute(o, k); }
        el.setAttribute(a, T(k));
      });
    });
  }
  sel.addEventListener('change', function () {
    lang = sel.value;
    try { localStorage.setItem('rimba.lang', lang); } catch (e) {}
    apply(); document.dispatchEvent(new Event('langchange'));
  });
  apply();
})();