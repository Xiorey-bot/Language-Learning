"use strict";

var _GRAMMAR_CONTENT;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GRAMMAR_CONTENT = (_GRAMMAR_CONTENT = {
  "〜と目される": {
    arti: "Menyatakan 'dipandang/dianggap sebagai' secara umum oleh masyarakat.",
    penjelasan: "Kata benda + と目される.",
    contoh: [{
      jp: "こうほしゃと めされている。",
      romaji: "Kouhosha to mesareteiru.",
      id: "Dipandang sebagai kandidat."
    }]
  },
  "〜の至り": {
    arti: "Menyatakan perasaan sangat kuat — 'sungguh suatu kehormatan/rasa malu'.",
    penjelasan: "Kata benda + の至り.",
    contoh: [{
      jp: "こうえいの いたりです。",
      romaji: "Kouei no itari desu.",
      id: "Sungguh suatu kehormatan."
    }]
  },
  "〜と思いきや": {
    arti: "Menyatakan hasil di luar dugaan — 'kirain... eh ternyata'.",
    penjelasan: "Kalimat bentuk biasa + と思いきや.",
    contoh: [{
      jp: "あめだと おもいきや、はれてきた。",
      romaji: "Ame da to omoikiya, harete kita.",
      id: "Kirain hujan, eh ternyata cerah."
    }]
  },
  "〜ようが〜まいが": {
    arti: "Menyatakan 'baik melakukan atau tidak, sama saja' — konsesi kuat.",
    penjelasan: "Kata kerja bentuk -u (volitional) + が + bentuk kamus + まいが.",
    contoh: [{
      jp: "かれが こようが こまいが、かんけいない。",
      romaji: "Kare ga koyou ga komaiga, kankeinai.",
      id: "Baik dia datang atau tidak, tidak masalah."
    }]
  },
  "〜なりに": {
    arti: "Menyatakan 'sesuai dengan kapasitas/caranya sendiri'.",
    penjelasan: "Kata benda + なりに.",
    contoh: [{
      jp: "じぶんなりに どりょくしました。",
      romaji: "Jibun nari ni doryoku shimashita.",
      id: "Saya berusaha sesuai kemampuan saya sendiri."
    }]
  },
  "〜ながらに": {
    arti: "Menyatakan keadaan yang tetap berlangsung meski melakukan hal lain (diperdalam).",
    penjelasan: "Kata benda + ながらに.",
    contoh: [{
      jp: "なみだながらに かたった。",
      romaji: "Namida nagara ni katatta.",
      id: "Bercerita sambil menangis."
    }]
  },
  "〜たが最後": {
    arti: "Menyatakan 'begitu terjadi, maka tidak bisa dihentikan lagi'.",
    penjelasan: "Kata kerja bentuk -ta + が最後.",
    contoh: [{
      jp: "はじめたが さいご、とめられない せいかくだ。",
      romaji: "Hajimeta ga saigo, tomerarenai seikaku da.",
      id: "Sifatnya begitu mulai, tidak bisa berhenti."
    }]
  },
  "〜には当たらない": {
    arti: "Menyatakan 'tidak perlu sampai' bereaksi tertentu — 'tidak pantas untuk'.",
    penjelasan: "Kata kerja bentuk kamus + には当たらない.",
    contoh: [{
      jp: "おどろくには あたらない。",
      romaji: "Odoroku niwa ataranai.",
      id: "Tidak perlu sampai terkejut."
    }]
  },
  "〜てからでは遅い": {
    arti: "Menyatakan 'kalau sudah terlambat, baru bertindak juga percuma'.",
    penjelasan: "Kata kerja bentuk -te + からでは遅い.",
    contoh: [{
      jp: "びょうきに なってからでは おそい。",
      romaji: "Byouki ni natte kara dewa osoi.",
      id: "Kalau sudah sakit baru bertindak, sudah terlambat."
    }]
  },
  "〜と相成る": {
    arti: "Bentuk sangat formal dari 'menjadi' — sering dipakai di pidato/undangan resmi.",
    penjelasan: "Kata benda + と相成る.",
    contoh: [{
      jp: "らいげつ かいさいと あいなりました。",
      romaji: "Raigetsu kaisai to ainarimashita.",
      id: "Diputuskan akan diadakan bulan depan."
    }]
  },
  "〜と言えなくもない": {
    arti: "Menyatakan pengakuan ragu-ragu — 'bisa dibilang begitu juga, sih'.",
    penjelasan: "Kalimat bentuk biasa + と言えなくもない.",
    contoh: [{
      jp: "せいこうと いえなくもない。",
      romaji: "Seikou to ienakumonai.",
      id: "Bisa dibilang sukses juga, sih."
    }]
  },
  "〜ただでさえ": {
    arti: "Menyatakan penekanan 'sudah begini saja... apalagi'.",
    penjelasan: "ただでさえ di awal kalimat.",
    contoh: [{
      jp: "ただでさえ いそがしいのに、しごとが ふえた。",
      romaji: "Tadadesae isogashii noni, shigoto ga fueta.",
      id: "Sudah sibuk begini saja, pekerjaan malah bertambah."
    }]
  },
  "〜とあって": {
    arti: "Menyatakan sebab dari situasi khusus/langka — 'karena merupakan'.",
    penjelasan: "Kata benda + とあって.",
    contoh: [{
      jp: "れんきゅうとあって、みちが こんでいる。",
      romaji: "Renkyuu to atte, michi ga kondeiru.",
      id: "Karena libur panjang, jalanan macet."
    }]
  },
  "〜と見える": {
    arti: "Menyatakan dugaan berdasarkan pengamatan — 'sepertinya/kelihatannya'.",
    penjelasan: "Kalimat bentuk biasa + と見える.",
    contoh: [{
      jp: "つかれていると みえる。",
      romaji: "Tsukareteiru to mieru.",
      id: "Sepertinya sedang lelah."
    }]
  },
  "〜が最後、〜てやまない（つよめ）": {
    arti: "Bentuk penguat てやまない dalam konteks sastra formal (lihat てやまない dasar).",
    penjelasan: "Kata kerja bentuk -te + やまない.",
    contoh: [{
      jp: "かんしゃしてやみません。",
      romaji: "Kansha shiteyamimasen.",
      id: "Terus berterima kasih tanpa henti."
    }]
  },
  "〜束の間": {
    arti: "Menyatakan 'sesaat/sekejap' — waktu yang sangat singkat.",
    penjelasan: "Kata benda + 束の間.",
    contoh: [{
      jp: "つかのまの きゅうそくを とった。",
      romaji: "Tsuka no ma no kyuusoku o totta.",
      id: "Mengambil istirahat sejenak."
    }]
  },
  "〜と裏腹に": {
    arti: "Menyatakan pertentangan — 'berlawanan dengan/berkebalikan dari'.",
    penjelasan: "Kata benda + と裏腹に.",
    contoh: [{
      jp: "みための りっぱさと うらはらに、なかみは そまつだ。",
      romaji: "Mitame no rippasa to urahara ni, nakami wa somatsu da.",
      id: "Berkebalikan dengan tampilannya yang megah, isinya sederhana."
    }]
  },
  "〜てはかなわない": {
    arti: "Menyatakan 'kalau begini terus, tidak tertahankan/tidak bisa menang'.",
    penjelasan: "Kata kerja bentuk -te + はかなわない.",
    contoh: [{
      jp: "まいにち ざんぎょうしてはかなわない。",
      romaji: "Mainichi zangyoushitewa kanawanai.",
      id: "Kalau lembur tiap hari begini, tidak tertahankan."
    }]
  },
  "〜には及ばぬまでも": {
    arti: "Variasi formal 〜には及ばないまでも — 'meski tidak sampai'.",
    penjelasan: "Kata kerja bentuk kamus + には及ばぬまでも.",
    contoh: [{
      jp: "かんぺきには およばぬまでも、がんばりました。",
      romaji: "Kanpeki niwa oyobanu made mo, ganbarimashita.",
      id: "Meski tidak sampai sempurna, sudah berusaha keras."
    }]
  },
  "〜にかたくない": {
    arti: "Menyatakan 'mudah dibayangkan/tidak sulit' — sesuatu bisa dipahami tanpa penjelasan lebih.",
    penjelasan: "Kata benda + にかたくない.",
    contoh: [{
      jp: "かれの きもちは そうぞうに かたくない。",
      romaji: "Kare no kimochi wa souzou ni katakunai.",
      id: "Perasaannya mudah dibayangkan."
    }]
  },
  "〜ものを": {
    arti: "Menyatakan penyesalan/kekecewaan — 'padahal seharusnya', nuansa menyalahkan halus.",
    penjelasan: "Kata kerja bentuk -ta/biasa + ものを.",
    contoh: [{
      jp: "いえば よかったものを、だまっていた。",
      romaji: "Ieba yokatta mono o, damatteita.",
      id: "Padahal kalau bicara lebih baik, malah diam saja."
    }]
  },
  "〜ないまでも": {
    arti: "Menyatakan 'meskipun tidak sampai... setidaknya'.",
    penjelasan: "Kata kerja bentuk nai + までも.",
    contoh: [{
      jp: "かんぺきではないまでも、まあまあの できです。",
      romaji: "Kanpeki dewa naimademo, maamaa no deki desu.",
      id: "Meski tidak sempurna, hasilnya lumayan."
    }]
  },
  "〜ないものか": {
    arti: "Menyatakan harapan kuat — 'tidak bisakah/adakah cara'.",
    penjelasan: "Kata kerja bentuk nai + ものか.",
    contoh: [{
      jp: "なんとか かいけつできないものか。",
      romaji: "Nantoka kaiketsu dekinai mono ka.",
      id: "Adakah cara supaya bisa diselesaikan?"
    }]
  },
  "〜んがための": {
    arti: "Variasi 〜んがため sebagai kata sifat — 'demi mencapai'.",
    penjelasan: "Kata kerja bentuk nai (buang ない) + んがための.",
    contoh: [{
      jp: "かちを えんがための どりょく。",
      romaji: "Kachi o engatame no doryoku.",
      id: "Usaha demi meraih kemenangan."
    }]
  },
  "〜手前": {
    arti: "Menyatakan 'karena harus menjaga muka/posisi di hadapan' seseorang.",
    penjelasan: "Kata benda/kata kerja bentuk kamus + 手前.",
    contoh: [{
      jp: "やくそくした てまえ、いかざるを えない。",
      romaji: "Yakusoku shita temae, ikazaru o enai.",
      id: "Karena sudah berjanji, terpaksa harus pergi."
    }]
  },
  "〜ずにはおかない": {
    arti: "Menyatakan sesuatu 'pasti akan terjadi/tidak akan dibiarkan begitu saja'.",
    penjelasan: "Kata kerja bentuk nai (buang ない) + ずにはおかない.",
    contoh: [{
      jp: "かんどうさせずには おかない えいがだ。",
      romaji: "Kandousasezu niwa okanai eiga da.",
      id: "Film yang pasti membuat terharu."
    }]
  },
  "〜にかこつけて": {
    arti: "Menyatakan 'dengan dalih/alasan' untuk melakukan sesuatu.",
    penjelasan: "Kata benda + にかこつけて.",
    contoh: [{
      jp: "しごとに かこつけて、さんかしなかった。",
      romaji: "Shigoto ni kakotsukete, sanka shinakatta.",
      id: "Dengan dalih pekerjaan, tidak ikut berpartisipasi."
    }]
  },
  "〜すべもない": {
    arti: "Menyatakan 'tidak ada cara sama sekali' untuk melakukan sesuatu.",
    penjelasan: "Kata kerja bentuk kamus + すべもない.",
    contoh: [{
      jp: "なすすべもなく、みているしか なかった。",
      romaji: "Nasu sube mo naku, miteiru shika nakatta.",
      id: "Tanpa ada cara, hanya bisa menonton saja."
    }]
  },
  "〜と相場が決まっている": {
    arti: "Menyatakan 'sudah menjadi kebiasaan umum/lumrah' — nuansa santai.",
    penjelasan: "Kalimat bentuk biasa + と相場が決まっている.",
    contoh: [{
      jp: "なつは スイカと そうばが きまっている。",
      romaji: "Natsu wa suika to souba ga kimatteiru.",
      id: "Musim panas itu identik dengan semangka."
    }]
  },
  "〜始末だ": {
    arti: "Menyatakan hasil akhir yang buruk/mengecewakan dari suatu rangkaian kejadian.",
    penjelasan: "Kalimat bentuk biasa + 始末だ.",
    contoh: [{
      jp: "さいごには なきだす しまつだった。",
      romaji: "Saigo niwa nakidasu shimatsu datta.",
      id: "Pada akhirnya, berujung menangis."
    }]
  },
  "〜には及ばない": {
    arti: "Menyatakan 'tidak perlu sampai' melakukan sesuatu.",
    penjelasan: "Kata kerja bentuk kamus + には及ばない.",
    contoh: [{
      jp: "わざわざ くるには およびません。",
      romaji: "Wazawaza kuru niwa oyobimasen.",
      id: "Tidak perlu sampai repot-repot datang."
    }]
  },
  "〜てもさしつかえない": {
    arti: "Menyatakan izin formal — 'tidak masalah meskipun'.",
    penjelasan: "Kata kerja bentuk -te + もさしつかえない.",
    contoh: [{
      jp: "ここに すわっても さしつかえありません。",
      romaji: "Koko ni suwattemo sashitsukae arimasen.",
      id: "Tidak masalah duduk di sini."
    }]
  },
  "〜たる所以": {
    arti: "Menyatakan 'alasan mendasar mengapa (seseorang/sesuatu) disebut demikian'.",
    penjelasan: "Kata benda + たる所以.",
    contoh: [{
      jp: "かれが リーダーたる ゆえんは、せきにんかんに ある。",
      romaji: "Kare ga riidaa taru yuen wa, sekininkan ni aru.",
      id: "Alasan mendasar dia layak disebut pemimpin adalah rasa tanggung jawabnya."
    }]
  },
  "〜を皮切りに": {
    arti: "Menyatakan 'dimulai dari' sebagai titik awal rangkaian kejadian.",
    penjelasan: "Kata benda + を皮切りに.",
    contoh: [{
      jp: "とうきょうを かわきりに、ぜんこくで こうえんかいを ひらいた。",
      romaji: "Toukyou o kawakiri ni, zenkoku de kouenkai o hiraita.",
      id: "Dimulai dari Tokyo, mengadakan ceramah di seluruh negeri."
    }]
  },
  "〜に足らない": {
    arti: "Menyatakan 'tidak layak/tidak cukup untuk' sesuatu — nuansa meremehkan.",
    penjelasan: "Kata kerja bentuk kamus + に足らない.",
    contoh: [{
      jp: "とるに たらない ことです。",
      romaji: "Toru ni taranai koto desu.",
      id: "Hal yang tidak layak dipedulikan."
    }]
  },
  "〜ともあろう": {
    arti: "Menyatakan kritik atas sesuatu yang tidak sesuai dengan status seseorang.",
    penjelasan: "Kata benda + ともあろう.",
    contoh: [{
      jp: "せんせいとも あろう ひとが、そんな ことを いうとは。",
      romaji: "Sensei tomo arou hito ga, sonna koto o iu towa.",
      id: "Orang yang seharusnya seorang guru, kok bicara begitu."
    }]
  },
  "〜ことなしに": {
    arti: "Menyatakan 'tanpa melakukan' sesuatu terlebih dahulu.",
    penjelasan: "Kata kerja bentuk kamus + ことなしに.",
    contoh: [{
      jp: "れんしゅうする ことなしに、じょうたつは ありません。",
      romaji: "Renshuu suru koto nashi ni, joutatsu wa arimasen.",
      id: "Tanpa berlatih, tidak akan ada kemajuan."
    }]
  },
  "〜ならいざしらず": {
    arti: "Menyatakan 'kalau itu masih bisa dimaklumi, tapi kalau ini...'.",
    penjelasan: "Kata benda + ならいざしらず.",
    contoh: [{
      jp: "こどもなら いざしらず、おとなが そんな ことを。",
      romaji: "Kodomo nara izashirazu, otona ga sonna koto o.",
      id: "Kalau anak-anak masih wajar, tapi orang dewasa melakukan itu?"
    }]
  },
  "〜と言わんばかりに": {
    arti: "Menyatakan sikap/ekspresi yang seolah-olah mengatakan sesuatu tanpa berkata langsung.",
    penjelasan: "Kalimat bentuk biasa + と言わんばかりに.",
    contoh: [{
      jp: "もう たくさんだと いわんばかりに、といをでた。",
      romaji: "Mou takusan da to iwanbakari ni, toi o deta.",
      id: "Seolah mengatakan 'sudah cukup', keluar dari ruangan."
    }]
  },
  "〜であれ〜であれ": {
    arti: "Menyatakan 'baik... maupun...' — mencakup segala kemungkinan (variasi にしろ).",
    penjelasan: "Kata benda + であれ, diulang.",
    contoh: [{
      jp: "せいこう であれ しっぱい であれ、けいけんに なる。",
      romaji: "Seikou de are shippai de are, keiken ni naru.",
      id: "Baik sukses maupun gagal, akan menjadi pengalaman."
    }]
  },
  "〜を余儀なくされる": {
    arti: "Menyatakan keterpaksaan kuat karena keadaan di luar kendali — 'terpaksa harus'.",
    penjelasan: "Kata benda + を余儀なくされる.",
    contoh: [{
      jp: "たいふうの ため、しあいは ちゅうしを よぎなくされた。",
      romaji: "Taifuu no tame, shiai wa chuushi o yoginakusareta.",
      id: "Karena topan, pertandingan terpaksa dibatalkan."
    }]
  },
  "〜にほかならない": {
    arti: "Menyatakan penegasan kuat — 'tidak lain adalah/tepatnya adalah'.",
    penjelasan: "Kata benda + にほかならない.",
    contoh: [{
      jp: "せいこうの りゆうは どりょくに ほかなりません。",
      romaji: "Seikou no riyuu wa doryoku ni hokanarimasen.",
      id: "Alasan kesuksesan tidak lain adalah usaha keras."
    }]
  },
  "〜べからず": {
    arti: "Larangan sangat formal/tertulis — 'dilarang'.",
    penjelasan: "Kata kerja bentuk kamus + べからず.",
    contoh: [{
      jp: "しんにゅう すべからず。",
      romaji: "Shinnyuu subekarazu.",
      id: "Dilarang masuk."
    }]
  },
  "〜だに": {
    arti: "Menyatakan penekanan ekstrem — 'bahkan sekadar... saja sudah'.",
    penjelasan: "Kata kerja bentuk kamus + だに.",
    contoh: [{
      jp: "そうぞうだに できない できごとだった。",
      romaji: "Souzou dani dekinai dekigoto datta.",
      id: "Kejadian yang bahkan dibayangkan pun tidak bisa."
    }]
  },
  "〜なくして（は）": {
    arti: "Menyatakan syarat mutlak — 'tanpa adanya... maka tidak akan'.",
    penjelasan: "Kata benda + なくして（は）.",
    contoh: [{
      jp: "どりょく なくして、せいこうは ありません。",
      romaji: "Doryoku nakushite, seikou wa arimasen.",
      id: "Tanpa usaha, tidak ada kesuksesan."
    }]
  },
  "〜んがため": {
    arti: "Menyatakan tujuan kuat — 'demi/untuk mencapai' (sastra/formal).",
    penjelasan: "Kata kerja bentuk nai (buang ない) + んがため.",
    contoh: [{
      jp: "かちを えんがために、どりょくした。",
      romaji: "Kachi o engatame ni, doryoku shita.",
      id: "Berusaha demi meraih kemenangan."
    }]
  },
  "〜べく": {
    arti: "Menyatakan tujuan formal — 'dengan tujuan untuk'.",
    penjelasan: "Kata kerja bentuk kamus + べく.",
    contoh: [{
      jp: "もくひょうを たっせいすべく、けいかくを たてた。",
      romaji: "Mokuhyou o tassei subeku, keikaku o tateta.",
      id: "Menyusun rencana dengan tujuan mencapai target."
    }]
  },
  "〜いかんによらず": {
    arti: "Menyatakan 'terlepas dari bagaimanapun' suatu kondisi.",
    penjelasan: "Kata benda + いかんによらず.",
    contoh: [{
      jp: "けっかの いかんに よらず、どりょくを ひょうかします。",
      romaji: "Kekka no ikan ni yorazu, doryoku o hyouka shimasu.",
      id: "Terlepas dari hasilnya, usaha akan dihargai."
    }]
  },
  "〜たりとも": {
    arti: "Menyatakan penekanan ekstrem — 'sekalipun/bahkan hanya'.",
    penjelasan: "Angka/jumlah kecil + たりとも, diikuti negatif.",
    contoh: [{
      jp: "いちびょうたりとも むだに できません。",
      romaji: "Ichibyou tari tomo muda ni dekimasen.",
      id: "Bahkan satu detik pun tidak boleh disia-siakan."
    }]
  },
  "〜が早いか": {
    arti: "Menyatakan momen simultan — 'begitu... langsung'.",
    penjelasan: "Kata kerja bentuk kamus + が早いか.",
    contoh: [{
      jp: "ドアが あくが はやいか、とびだしていった。",
      romaji: "Doa ga aku ga hayaika, tobidashiteitta.",
      id: "Begitu pintu terbuka, langsung berlari keluar."
    }]
  },
  "〜なり": {
    arti: "Menyatakan tindakan langsung setelah momen tertentu — 'begitu... segera'.",
    penjelasan: "Kata kerja bentuk kamus + なり.",
    contoh: [{
      jp: "いえに つくなり、ねてしまった。",
      romaji: "Ie ni tsuku nari, neteshimatta.",
      id: "Begitu sampai rumah, langsung tertidur."
    }]
  },
  "〜が早いか、〜そばから": {
    arti: "Menekankan kecepatan berulang suatu kejadian.",
    penjelasan: "Kata kerja bentuk kamus + そばから.",
    contoh: [{
      jp: "おしえた そばから わすれてしまう。",
      romaji: "Oshieta soba kara wasureteshimau.",
      id: "Baru saja diajarkan, langsung lupa."
    }]
  },
  "〜にたえない": {
    arti: "Menyatakan sesuatu 'tidak tahan/tidak layak' dilihat/didengar.",
    penjelasan: "Kata benda + にたえない.",
    contoh: [{
      jp: "みるに たえない こうけいだった。",
      romaji: "Miru ni taenai koukei datta.",
      id: "Pemandangan yang tidak tahan untuk dilihat."
    }]
  },
  "〜てやまない": {
    arti: "Menyatakan perasaan yang terus-menerus tanpa henti — 'terus-menerus'.",
    penjelasan: "Kata kerja bentuk -te + やまない.",
    contoh: [{
      jp: "こうふくを いのってやみません。",
      romaji: "Koufuku o inotteyamimasen.",
      id: "Terus berdoa untuk kebahagiaan (tanpa henti)."
    }]
  },
  "〜まじき": {
    arti: "Menyatakan hal yang tidak seharusnya/tidak pantas dilakukan (formal). (Diperdalam dari N3)",
    penjelasan: "Kata kerja bentuk kamus + まじき.",
    contoh: [{
      jp: "ゆるすまじき こういだ。",
      romaji: "Yurusumajiki koui da.",
      id: "Perbuatan yang tidak boleh dimaafkan."
    }]
  },
  "〜んばかりに": {
    arti: "Menyatakan keadaan 'seolah-olah hampir' terjadi.",
    penjelasan: "Kata kerja bentuk nai (buang ない) + んばかりに.",
    contoh: [{
      jp: "なきださんばかりの かおを していた。",
      romaji: "Nakidasanbakari no kao o shiteita.",
      id: "Wajahnya seolah hampir menangis."
    }]
  },
  "〜ともなく・ともなしに": {
    arti: "Menyatakan tindakan tanpa tujuan/niat yang jelas.",
    penjelasan: "Kata kerja bentuk kamus + ともなく.",
    contoh: [{
      jp: "だれに いうともなく つぶやいた。",
      romaji: "Dare ni iu tomonaku tsubuyaita.",
      id: "Bergumam tanpa ditujukan ke siapa pun."
    }]
  },
  "〜うが・うと（も）": {
    arti: "Menyatakan 'apapun yang terjadi/tidak peduli' — konsesi kuat.",
    penjelasan: "Kata kerja bentuk -u (volitional-like) + が/と.",
    contoh: [{
      jp: "なにを いわれようが、きにしません。",
      romaji: "Nani o iwareyou ga, ki ni shimasen.",
      id: "Apapun yang dikatakan, saya tidak peduli."
    }]
  },
  "〜う（よう）にも〜ない": {
    arti: "Menyatakan ketidakmampuan meski ada niat — 'mau... pun tidak bisa'.",
    penjelasan: "Kata kerja bentuk -u (volitional) + にも + kata kerja bentuk nai.",
    contoh: [{
      jp: "にげようにも にげられません。",
      romaji: "Nigeyou nimo nigeraremasen.",
      id: "Mau melarikan diri pun tidak bisa."
    }]
  },
  "〜そびれる": {
    arti: "Menyatakan gagal melakukan sesuatu karena kehilangan kesempatan.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + そびれる.",
    contoh: [{
      jp: "いう きかいを のがして、いいそびれた。",
      romaji: "Iu kikai o nogashite, iisobireta.",
      id: "Kehilangan kesempatan sehingga gagal mengatakannya."
    }]
  },
  "〜ずくめ": {
    arti: "Menyatakan 'serba/penuh dengan' sesuatu.",
    penjelasan: "Kata benda + ずくめ.",
    contoh: [{
      jp: "こんげつは いいことずくめでした。",
      romaji: "Kongetsu wa ii koto zukume deshita.",
      id: "Bulan ini serba hal-hal baik."
    }]
  },
  "〜めく": {
    arti: "Menyatakan 'terasa/menyerupai' suatu kesan.",
    penjelasan: "Kata benda + めく.",
    contoh: [{
      jp: "はるめいて きました。",
      romaji: "Harumeite kimashita.",
      id: "Mulai terasa seperti musim semi."
    }]
  },
  "〜すら": {
    arti: "Menyatakan penekanan ekstrem — 'bahkan/sampai-sampai' (mirip さえ, lebih sastra).",
    penjelasan: "Kata benda + すら.",
    contoh: [{
      jp: "かれすら わからなかった。",
      romaji: "Kare sura wakaranakatta.",
      id: "Bahkan dia pun tidak mengerti."
    }]
  },
  "〜こそすれ": {
    arti: "Menyatakan penekanan searah — 'justru/malah'.",
    penjelasan: "Kata benda + こそすれ, diikuti negatif dari kebalikannya.",
    contoh: [{
      jp: "かんしゃこそすれ、うらむ ことは ありません。",
      romaji: "Kansha koso sure, uramu koto wa arimasen.",
      id: "Justru berterima kasih, bukan membenci."
    }]
  },
  "〜きっての": {
    arti: "Menyatakan 'terbaik/paling unggul dalam' suatu lingkup.",
    penjelasan: "Kata benda + きっての.",
    contoh: [{
      jp: "かいしゃきっての えいぎょうまんです。",
      romaji: "Kaisha kitte no eigyouman desu.",
      id: "Sales terbaik di perusahaan ini."
    }]
  },
  "〜ならでは": {
    arti: "Menyatakan 'khas/hanya bisa dari' — keunikan tertentu.",
    penjelasan: "Kata benda + ならでは.",
    contoh: [{
      jp: "にほんならではの ぶんかです。",
      romaji: "Nihon narade wa no bunka desu.",
      id: "Budaya yang khas hanya ada di Jepang."
    }]
  },
  "〜たる（もの）": {
    arti: "Menyatakan status/kedudukan formal — 'sebagai seorang yang...'.",
    penjelasan: "Kata benda + たる（もの）.",
    contoh: [{
      jp: "リーダーたる もの、せきにんを もつべきだ。",
      romaji: "Riidaa taru mono, sekinin o motsu beki da.",
      id: "Sebagai seorang pemimpin, harus bertanggung jawab."
    }]
  },
  "〜と相まって": {
    arti: "Menyatakan gabungan dua faktor yang saling memperkuat.",
    penjelasan: "Kata benda + と相まって.",
    contoh: [{
      jp: "ぎじゅつと あいまって、せいさんせいが あがった。",
      romaji: "Gijutsu to aimatte, seisansei ga agatta.",
      id: "Digabung dengan teknologi, produktivitas meningkat."
    }]
  },
  "〜ゆえに": {
    arti: "Menyatakan sebab secara formal/sastra — 'oleh karena itu'.",
    penjelasan: "Kata benda/kalimat bentuk biasa + ゆえに.",
    contoh: [{
      jp: "わかい ゆえの あやまちだった。",
      romaji: "Wakai yue no ayamachi datta.",
      id: "Kesalahan karena masih muda."
    }]
  },
  "〜にとどまらず": {
    arti: "Menyatakan 'tidak terbatas pada... saja' — meluas ke hal lain.",
    penjelasan: "Kata benda + にとどまらず.",
    contoh: [{
      jp: "にほんに とどまらず、せかいじゅうに ひろまった。",
      romaji: "Nihon ni todomarazu, sekaijuu ni hiromatta.",
      id: "Tidak terbatas di Jepang saja, menyebar ke seluruh dunia."
    }]
  },
  "〜てしかるべきだ": {
    arti: "Menyatakan sesuatu 'sepantasnya/seharusnya' terjadi.",
    penjelasan: "Kata kerja bentuk -te + しかるべきだ.",
    contoh: [{
      jp: "もっと ひょうかされてしかるべきだ。",
      romaji: "Motto hyouka sarete shikarubeki da.",
      id: "Sepantasnya dihargai lebih."
    }]
  },
  "〜に足る": {
    arti: "Menyatakan 'cukup/layak untuk' sesuatu.",
    penjelasan: "Kata kerja bentuk kamus + に足る.",
    contoh: [{
      jp: "しんらいするに たる ひとです。",
      romaji: "Shinrai suru ni taru hito desu.",
      id: "Orang yang layak dipercaya."
    }]
  },
  "〜極まる・極まりない": {
    arti: "Menyatakan tingkat ekstrem suatu sifat — 'amat sangat'.",
    penjelasan: "Kata sifat -na + 極まる/極まりない.",
    contoh: [{
      jp: "しつれい きわまりない たいどだ。",
      romaji: "Shitsurei kiwamarinai taido da.",
      id: "Sikap yang amat sangat tidak sopan."
    }]
  },
  "〜んとする": {
    arti: "Menyatakan 'hendak/sedang berusaha' melakukan sesuatu (sastra).",
    penjelasan: "Kata kerja bentuk nai (buang ない) + んとする.",
    contoh: [{
      jp: "たいようが しずまんと している。",
      romaji: "Taiyou ga shizumanto shiteiru.",
      id: "Matahari hendak terbenam."
    }]
  },
  "〜てはばからない": {
    arti: "Menyatakan keberanian menyatakan sesuatu tanpa ragu.",
    penjelasan: "Kata kerja bentuk -te + はばからない.",
    contoh: [{
      jp: "じぶんが いちばんだと いってはばからない。",
      romaji: "Jibun ga ichiban da to itte habakaranai.",
      id: "Berani mengatakan dirinya yang terbaik tanpa ragu."
    }]
  },
  "〜をものともせず": {
    arti: "Menyatakan 'tanpa menghiraukan' rintangan/kesulitan.",
    penjelasan: "Kata benda + をものともせず.",
    contoh: [{
      jp: "しっぱいを ものともせず、ちょうせんしつづけた。",
      romaji: "Shippai o mono tomo sezu, chousen shitsuzuketa.",
      id: "Tanpa menghiraukan kegagalan, terus mencoba."
    }]
  },
  "〜をよそに": {
    arti: "Menyatakan 'tanpa mempedulikan' sesuatu (nuansa kritis).",
    penjelasan: "Kata benda + をよそに.",
    contoh: [{
      jp: "しゅういの はんたいを よそに、けっこうしました。",
      romaji: "Shuui no hantai o yoso ni, kekkon shimashita.",
      id: "Tanpa mempedulikan penentangan sekitar, tetap menikah."
    }]
  },
  "〜あってこそ": {
    arti: "Menyatakan 'hanya karena ada... maka bisa'.",
    penjelasan: "Kata benda + あってこそ.",
    contoh: [{
      jp: "みんなの きょうりょくが あってこその せいこうです。",
      romaji: "Minna no kyouryoku ga atte koso no seikou desu.",
      id: "Kesuksesan ini berkat adanya kerja sama semua orang."
    }]
  },
  "〜ながらに（して）": {
    arti: "Menyatakan keadaan yang berlangsung bersamaan sejak awal.",
    penjelasan: "Kata benda + ながらに.",
    contoh: [{
      jp: "うまれながらに もっている さいのう。",
      romaji: "Umarenagara ni motteiru sainou.",
      id: "Bakat yang dimiliki sejak lahir."
    }]
  },
  "〜おかげで": {
    arti: "Menyatakan sebab yang membawa hasil BAIK — 'berkat/berkat adanya'.",
    penjelasan: "Kata benda/kata kerja bentuk biasa + おかげで.",
    contoh: [{
      jp: "せんせいの おかげで、ごうかくしました。",
      romaji: "Sensei no okage de, goukaku shimashita.",
      id: "Berkat guru, saya lulus."
    }]
  },
  "〜せいで": {
    arti: "Menyatakan sebab yang membawa hasil BURUK — 'gara-gara'. (Dilanjutkan/diperdalam dari N4)",
    penjelasan: "Kata benda/kata kerja bentuk biasa + せいで.",
    contoh: [{
      jp: "じこの せいで、でんしゃが とまりました。",
      romaji: "Jiko no sei de, densha ga tomarimashita.",
      id: "Gara-gara kecelakaan, kereta berhenti."
    }]
  },
  "〜わけではない": {
    arti: "Menyatakan penyangkalan sebagian — 'bukan berarti/tidak selalu begitu'.",
    penjelasan: "Kalimat bentuk biasa + わけではない.",
    contoh: [{
      jp: "にくが きらいなわけではありません。",
      romaji: "Niku ga kirai na wake dewa arimasen.",
      id: "Bukan berarti saya tidak suka daging."
    }]
  },
  "〜たとたん(に)": {
    arti: "Menyatakan momen 'begitu... langsung/seketika itu juga'.",
    penjelasan: "Kata kerja bentuk -ta + とたん(に).",
    contoh: [{
      jp: "いえを でたとたんに、あめが ふりだしました。",
      romaji: "Ie o deta totan ni, ame ga furidashimashita.",
      id: "Begitu keluar rumah, langsung hujan turun."
    }]
  },
  "〜に対して": {
    arti: "Menyatakan objek sikap/tindakan — 'terhadap'.",
    penjelasan: "Kata benda + に対して.",
    contoh: [{
      jp: "この もんだいに たいして、いけんが あります。",
      romaji: "Kono mondai ni taishite, iken ga arimasu.",
      id: "Saya punya pendapat terhadap masalah ini."
    }]
  },
  "〜において(も)": {
    arti: "Bentuk formal 'di/dalam' — dilanjutkan dari N4, dipakai lebih luas di N3 (bidang/waktu abstrak).",
    penjelasan: "Kata benda + において.",
    contoh: [{
      jp: "げんだいに おいて、じょうほうは たいせつです。",
      romaji: "Gendai ni oite, jouhou wa taisetsu desu.",
      id: "Di zaman sekarang, informasi itu penting."
    }]
  },
  "〜に基づいて": {
    arti: "Menyatakan dasar suatu tindakan — 'berdasarkan'.",
    penjelasan: "Kata benda + に基づいて.",
    contoh: [{
      jp: "データに もとづいて、けいかくを たてました。",
      romaji: "Deeta ni motozuite, keikaku o tatemashita.",
      id: "Berdasarkan data, saya menyusun rencana."
    }]
  },
  "〜に関わらず": {
    arti: "Menyatakan 'terlepas dari/tanpa memandang'.",
    penjelasan: "Kata benda/kalimat + に関わらず.",
    contoh: [{
      jp: "てんきに かかわらず、しあいは おこなわれます。",
      romaji: "Tenki ni kakawarazu, shiai wa okonawaremasu.",
      id: "Terlepas dari cuaca, pertandingan tetap dilaksanakan."
    }]
  },
  "〜にもかかわらず": {
    arti: "Menyatakan pertentangan kuat — 'meskipun begitu/walaupun'.",
    penjelasan: "Kalimat bentuk biasa + にもかかわらず.",
    contoh: [{
      jp: "あめにも かかわらず、でかけました。",
      romaji: "Ame nimo kakawarazu, dekakemashita.",
      id: "Meskipun hujan, saya tetap pergi."
    }]
  },
  "〜反面": {
    arti: "Menyatakan dua sisi berlawanan dari satu hal — 'di satu sisi... di sisi lain'.",
    penjelasan: "Kata sifat/kata kerja bentuk biasa + 反面.",
    contoh: [{
      jp: "べんりな はんめん、たかいです。",
      romaji: "Benri na hanmen, takai desu.",
      id: "Di satu sisi praktis, di sisi lain mahal."
    }]
  },
  "〜一方で": {
    arti: "Menyatakan kontras antara dua situasi — 'sementara itu/di sisi lain'.",
    penjelasan: "Kalimat bentuk biasa + 一方で.",
    contoh: [{
      jp: "としの ひとは ふえる いっぽうで、わかものは へっています。",
      romaji: "Toshi no hito wa fueru ippou de, wakamono wa hetteimasu.",
      id: "Orang di kota terus bertambah, sementara anak muda berkurang."
    }]
  },
  "〜ものの": {
    arti: "Menyatakan pertentangan — 'meskipun begitu' (lebih formal dari のに).",
    penjelasan: "Kalimat bentuk biasa + ものの.",
    contoh: [{
      jp: "やくそくしたものの、いけませんでした。",
      romaji: "Yakusoku shita monono, ikemasendeshita.",
      id: "Meskipun sudah janji, saya tidak bisa pergi."
    }]
  },
  "〜つつも": {
    arti: "Menyatakan tindakan bertentangan yang dilakukan bersamaan — 'sambil, meski'.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + つつも.",
    contoh: [{
      jp: "わるいと おもいつつも、たべてしまいました。",
      romaji: "Warui to omoitsutsu mo, tabeteshimaimashita.",
      id: "Meski tahu itu tidak baik, saya tetap memakannya."
    }]
  },
  "〜くせに（かんじょうてき）": {
    arti: "Bentuk kritis 'padahal (kok)' — sudah muncul di N4, di N3 dipakai lebih halus/luas.",
    penjelasan: "Kalimat bentuk biasa + くせに.",
    contoh: [{
      jp: "しらないくせに、しったふりを しました。",
      romaji: "Shiranai kuse ni, shitta furi o shimashita.",
      id: "Padahal tidak tahu, malah berpura-pura tahu."
    }]
  },
  "〜あげく": {
    arti: "Menyatakan hasil AKHIR yang buruk setelah proses panjang — 'ujung-ujungnya'.",
    penjelasan: "Kata kerja bentuk -ta + あげく.",
    contoh: [{
      jp: "なやんだ あげく、やめることに しました。",
      romaji: "Nayanda ageku, yameru koto ni shimashita.",
      id: "Setelah lama galau, ujung-ujungnya saya putuskan berhenti."
    }]
  },
  "〜末に": {
    arti: "Menyatakan hasil setelah proses panjang — netral/positif, beda dari あげく.",
    penjelasan: "Kata benda/kata kerja bentuk -ta + 末に.",
    contoh: [{
      jp: "ながい かいぎの すえに、けっていしました。",
      romaji: "Nagai kaigi no sue ni, kettei shimashita.",
      id: "Setelah rapat panjang, akhirnya diputuskan."
    }]
  },
  "〜つつある": {
    arti: "Menyatakan proses perubahan yang sedang berlangsung — 'sedang berangsur-angsur'.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + つつある.",
    contoh: [{
      jp: "かんきょうが かいぜんしつつ あります。",
      romaji: "Kankyou ga kaizen shitsutsu arimasu.",
      id: "Lingkungan sedang berangsur membaik."
    }]
  },
  "〜ぬきで・ぬきに": {
    arti: "Menyatakan 'tanpa/mengecualikan sesuatu'.",
    penjelasan: "Kata benda + ぬきで/ぬきに.",
    contoh: [{
      jp: "じょうだんぬきで、はなしましょう。",
      romaji: "Joudan nuki de, hanashimashou.",
      id: "Tanpa bercanda, mari kita bicara serius."
    }]
  },
  "〜かねる": {
    arti: "Menyatakan 'sulit/tidak bisa melakukan' secara sopan.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + かねる.",
    contoh: [{
      jp: "その いけんには さんせいしかねます。",
      romaji: "Sono iken niwa sansei shikanemasu.",
      id: "Saya sulit menyetujui pendapat itu."
    }]
  },
  "〜かねない": {
    arti: "Menyatakan kemungkinan hal BURUK terjadi — 'bisa jadi/berisiko'.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + かねない.",
    contoh: [{
      jp: "むりを すると、びょうきに なりかねません。",
      romaji: "Muri o suru to, byouki ni narikanemasen.",
      id: "Kalau memaksakan diri, bisa jadi sakit."
    }]
  },
  "〜おそれがある": {
    arti: "Menyatakan kekhawatiran akan terjadinya sesuatu yang buruk — 'ada kemungkinan/risiko'.",
    penjelasan: "Kata kerja bentuk kamus + おそれがある.",
    contoh: [{
      jp: "たいふうが くる おそれが あります。",
      romaji: "Taifuu ga kuru osore ga arimasu.",
      id: "Ada kemungkinan topan akan datang."
    }]
  },
  "〜ざるを得ない": {
    arti: "Menyatakan keterpaksaan — 'terpaksa harus'.",
    penjelasan: "Kata kerja bentuk nai (buang ない) + ざるを得ない.",
    contoh: [{
      jp: "しごとを やめざるを えませんでした。",
      romaji: "Shigoto o yamezaru o emasendeshita.",
      id: "Saya terpaksa berhenti kerja."
    }]
  },
  "〜ずにはいられない": {
    arti: "Menyatakan dorongan kuat yang tak tertahankan — 'tidak bisa tidak melakukan'.",
    penjelasan: "Kata kerja bentuk nai (buang ない) + ずにはいられない.",
    contoh: [{
      jp: "かのじょを みると、わらわずには いられません。",
      romaji: "Kanojo o miru to, warawazu niwa iraremasen.",
      id: "Kalau melihat dia, saya tidak bisa menahan tawa."
    }]
  },
  "〜てならない": {
    arti: "Menyatakan perasaan yang sangat kuat, tidak terbendung.",
    penjelasan: "Kata sifat/kata kerja bentuk -te + ならない.",
    contoh: [{
      jp: "しんぱいで ならない。",
      romaji: "Shinpai de naranai.",
      id: "Saya sangat khawatir sekali."
    }]
  },
  "〜てしょうがない・てたまらない": {
    arti: "Menyatakan perasaan/kondisi yang 'tak tertahankan' — versi kasual dari てならない.",
    penjelasan: "Kata sifat/kata kerja bentuk -te + しょうがない/たまらない.",
    contoh: [{
      jp: "のどが かわいて しょうがない。",
      romaji: "Nodo ga kawaite shouganai.",
      id: "Tenggorokan haus sekali tak tertahankan."
    }]
  },
  "〜以上（は）": {
    arti: "Menyatakan 'karena sudah begini, maka' — konsekuensi logis dari suatu keputusan/keadaan.",
    penjelasan: "Kata kerja bentuk kamus/ta + 以上（は）.",
    contoh: [{
      jp: "やると きめた いじょう、さいごまで やります。",
      romaji: "Yaru to kimeta ijou, saigo made yarimasu.",
      id: "Karena sudah memutuskan melakukannya, saya akan lakukan sampai akhir."
    }]
  },
  "〜上で": {
    arti: "Menyatakan 'setelah melakukan X, baru Y' (langkah berurutan penting).",
    penjelasan: "Kata kerja bentuk -ta + 上で.",
    contoh: [{
      jp: "そうだんした うえで、けっていします。",
      romaji: "Soudanshita ue de, kettei shimasu.",
      id: "Setelah berkonsultasi, baru saya putuskan."
    }]
  },
  "〜上（に）": {
    arti: "Menyatakan tambahan hal serupa — 'selain itu, terlebih lagi'.",
    penjelasan: "Kata sifat/kata kerja bentuk biasa + 上（に）.",
    contoh: [{
      jp: "やすい うえに、おいしいです。",
      romaji: "Yasui ue ni, oishii desu.",
      id: "Selain murah, juga enak."
    }]
  },
  "〜くらいなら": {
    arti: "Menyatakan pilihan yang tidak diinginkan dibanding alternatif lain — 'daripada'.",
    penjelasan: "Kata kerja bentuk kamus + くらいなら.",
    contoh: [{
      jp: "あやまるくらいなら、さいしょから しません。",
      romaji: "Ayamaru kurai nara, saisho kara shimasen.",
      id: "Daripada minta maaf, lebih baik dari awal tidak melakukannya."
    }]
  },
  "〜どころか": {
    arti: "Menyatakan penyangkalan kuat — 'jangankan... bahkan'.",
    penjelasan: "Kata benda/kata kerja bentuk biasa + どころか.",
    contoh: [{
      jp: "かんじ どころか、ひらがなも よめません。",
      romaji: "Kanji dokoroka, hiragana mo yomemasen.",
      id: "Jangankan kanji, hiragana pun saya tidak bisa baca."
    }]
  },
  "〜にすぎない": {
    arti: "Menyatakan 'hanya sekadar/tidak lebih dari'.",
    penjelasan: "Kata benda/kata kerja bentuk biasa + にすぎない.",
    contoh: [{
      jp: "これは いちれいに すぎません。",
      romaji: "Kore wa ichirei ni suginmasen.",
      id: "Ini hanya sekadar satu contoh."
    }]
  },
  "〜に決まっている": {
    arti: "Menyatakan keyakinan sangat kuat — 'sudah pasti'.",
    penjelasan: "Kalimat bentuk biasa + に決まっている.",
    contoh: [{
      jp: "がんばれば、うまくいくに きまっています。",
      romaji: "Ganbareba, umaku iku ni kimatteimasu.",
      id: "Kalau berusaha, sudah pasti akan berhasil."
    }]
  },
  "〜に違いない": {
    arti: "Menyatakan keyakinan kuat berdasarkan bukti — 'pasti/tidak salah lagi'. (Diperdalam dari N4)",
    penjelasan: "Kalimat bentuk biasa + に違いない.",
    contoh: [{
      jp: "あの ひとは にほんじんに ちがいありません。",
      romaji: "Ano hito wa nihonjin ni chigai arimasen.",
      id: "Orang itu pasti orang Jepang."
    }]
  },
  "〜んじゃないか": {
    arti: "Ungkapan dugaan santai — 'bukankah/kurasa begitu'.",
    penjelasan: "Kalimat bentuk biasa + んじゃないか.",
    contoh: [{
      jp: "それは むりなんじゃないですか。",
      romaji: "Sore wa muri nan ja nai desu ka.",
      id: "Bukankah itu tidak mungkin?"
    }]
  },
  "〜まい": {
    arti: "Menyatakan niat negatif kuat — 'tidak akan (pernah)'.",
    penjelasan: "Kata kerja bentuk kamus + まい.",
    contoh: [{
      jp: "にどと しませんまい。",
      romaji: "Nido to shimasumai.",
      id: "Saya tidak akan melakukannya lagi."
    }]
  },
  "〜べきではない": {
    arti: "Menyatakan larangan moral — 'seharusnya tidak'. (Negatif dari べきだ N4)",
    penjelasan: "Kata kerja bentuk kamus + べきではない.",
    contoh: [{
      jp: "うそを つくべきではありません。",
      romaji: "Uso o tsuku beki dewa arimasen.",
      id: "Seharusnya tidak berbohong."
    }]
  },
  "〜てはならない": {
    arti: "Menyatakan larangan tegas/formal — 'tidak boleh sama sekali'.",
    penjelasan: "Kata kerja bentuk -te + はならない.",
    contoh: [{
      jp: "この きまりを やぶってはなりません。",
      romaji: "Kono kimari o yabutte wa narimasen.",
      id: "Aturan ini tidak boleh dilanggar."
    }]
  },
  "〜ものだ（かんがい）": {
    arti: "Menyatakan kesan mendalam/nostalgia terhadap kebiasaan umum — 'begitulah biasanya'.",
    penjelasan: "Kata kerja bentuk kamus/ta + ものだ.",
    contoh: [{
      jp: "こどもの ころは よく あそんだ ものです。",
      romaji: "Kodomo no koro wa yoku asonda mono desu.",
      id: "Waktu kecil, saya sering bermain (kenangan)."
    }]
  },
  "〜べきだった": {
    arti: "Menyatakan penyesalan — 'seharusnya sudah melakukan'.",
    penjelasan: "Kata kerja bentuk kamus + べきだった.",
    contoh: [{
      jp: "もっと はやく いうべきでした。",
      romaji: "Motto hayaku iu beki deshita.",
      id: "Seharusnya saya bilang lebih cepat."
    }]
  },
  "〜ばよかった": {
    arti: "Menyatakan penyesalan — 'seandainya sudah...'.",
    penjelasan: "Kata kerja bentuk -ba + よかった.",
    contoh: [{
      jp: "べんきょうすれば よかったです。",
      romaji: "Benkyou sureba yokatta desu.",
      id: "Seandainya saya belajar (menyesal tidak belajar)."
    }]
  },
  "〜たらいい・たらどうですか": {
    arti: "Menyatakan saran — 'sebaiknya/bagaimana kalau'.",
    penjelasan: "Kata kerja bentuk -tara + いい/どうですか.",
    contoh: [{
      jp: "いしゃに みてもらったら どうですか。",
      romaji: "Isha ni mitemorattara dou desu ka.",
      id: "Bagaimana kalau diperiksa dokter?"
    }]
  },
  "〜たところで": {
    arti: "Menyatakan 'meskipun sudah melakukan X, tetap tidak berguna'.",
    penjelasan: "Kata kerja bentuk -ta + ところで.",
    contoh: [{
      jp: "いま はしったところで、まにあいません。",
      romaji: "Ima hashitta tokoro de, maniaimasen.",
      id: "Meski sekarang berlari, tetap tidak akan sempat."
    }]
  },
  "〜てからでないと・てからでなければ": {
    arti: "Menyatakan 'kalau tidak dilakukan dulu, maka tidak bisa'.",
    penjelasan: "Kata kerja bentuk -te + からでないと.",
    contoh: [{
      jp: "しょうにんを えてからでないと、すすめられません。",
      romaji: "Shounin o ete kara denai to, susumeraremasen.",
      id: "Kalau belum dapat persetujuan dulu, tidak bisa dilanjutkan."
    }]
  },
  "〜ぬく": {
    arti: "Menyatakan melakukan sesuatu sampai tuntas dengan gigih — 'sampai akhir/tuntas'.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + ぬく.",
    contoh: [{
      jp: "さいごまで はしりぬきました。",
      romaji: "Saigo made hashirinukimashita.",
      id: "Saya berlari sampai garis akhir dengan gigih."
    }]
  },
  "〜がち（ふかまり）": {
    arti: "Menyatakan kecenderungan (diperdalam dari N4) — sering dipakai untuk pola berulang negatif.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + がち.",
    contoh: [{
      jp: "びょうきがちな こどもでした。",
      romaji: "Byoukigachi na kodomo deshita.",
      id: "Saya anak yang sering sakit-sakitan."
    }]
  },
  "〜きらいがある": {
    arti: "Menyatakan kecenderungan negatif dalam sifat/kebiasaan seseorang.",
    penjelasan: "Kata kerja bentuk kamus + きらいがある.",
    contoh: [{
      jp: "かれは はなしを おおげさにする きらいが あります。",
      romaji: "Kare wa hanashi o oogesa ni suru kirai ga arimasu.",
      id: "Dia punya kecenderungan melebih-lebihkan cerita."
    }]
  },
  "〜かのようだ": {
    arti: "Menyatakan perumpamaan kuat — 'seolah-olah'.",
    penjelasan: "Kalimat bentuk biasa + かのようだ.",
    contoh: [{
      jp: "まるで ゆめを みているかの ようです。",
      romaji: "Marude yume o miteiru ka no you desu.",
      id: "Rasanya seolah-olah sedang bermimpi."
    }]
  },
  "〜まみれ": {
    arti: "Menyatakan 'penuh/berlumuran dengan' sesuatu (kotor).",
    penjelasan: "Kata benda + まみれ.",
    contoh: [{
      jp: "あせまみれに なりました。",
      romaji: "Ase mamire ni narimashita.",
      id: "Berlumuran keringat."
    }]
  },
  "〜だらけ": {
    arti: "Menyatakan 'penuh dengan' (banyak, bisa netral/negatif).",
    penjelasan: "Kata benda + だらけ.",
    contoh: [{
      jp: "まちがいだらけの ぶんしょうです。",
      romaji: "Machigai darake no bunshou desu.",
      id: "Tulisan yang penuh kesalahan."
    }]
  },
  "〜気味": {
    arti: "Menyatakan sedikit kecenderungan ke suatu kondisi — 'agak/cenderung'.",
    penjelasan: "Kata benda/kata kerja bentuk -masu (buang ます) + 気味.",
    contoh: [{
      jp: "さいきん、つかれぎみです。",
      romaji: "Saikin, tsukaregimi desu.",
      id: "Belakangan ini, agak lelah."
    }]
  },
  "〜っぱなし": {
    arti: "Menyatakan suatu keadaan dibiarkan begitu saja tanpa diurus — 'dibiarkan begitu saja'.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + っぱなし.",
    contoh: [{
      jp: "でんきを つけっぱなしに しました。",
      romaji: "Denki o tsukeppanashi ni shimashita.",
      id: "Lampunya dibiarkan menyala begitu saja."
    }]
  },
  "〜ぶり": {
    arti: "Menyatakan gaya/cara, atau jarak waktu sejak terakhir kali.",
    penjelasan: "Kata benda/kata kerja bentuk -masu (buang ます) + ぶり.",
    contoh: [{
      jp: "さんねんぶりに あいました。",
      romaji: "San-nen buri ni aimashita.",
      id: "Bertemu lagi setelah 3 tahun."
    }]
  },
  "〜次第": {
    arti: "Menyatakan 'segera setelah' sesuatu terjadi.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + 次第.",
    contoh: [{
      jp: "つきしだい、れんらくします。",
      romaji: "Tsuki shidai, renraku shimasu.",
      id: "Segera setelah tiba, saya akan menghubungi."
    }]
  },
  "〜次第だ（じじょう）": {
    arti: "Menyatakan 'tergantung pada' suatu faktor.",
    penjelasan: "Kata benda + 次第だ.",
    contoh: [{
      jp: "けっかは どりょくしだいです。",
      romaji: "Kekka wa doryoku shidai desu.",
      id: "Hasilnya tergantung usaha."
    }]
  },
  "〜わりに（は）": {
    arti: "Menyatakan 'padahal, dibandingkan dengan' — hasil di luar ekspektasi. (Diperdalam dari N4)",
    penjelasan: "Kata benda/kata kerja bentuk biasa + わりに(は).",
    contoh: [{
      jp: "ねだんの わりには、しつが いいです。",
      romaji: "Nedan no wari niwa, shitsu ga ii desu.",
      id: "Padahal harganya segitu, kualitasnya bagus."
    }]
  },
  "〜にしては": {
    arti: "Menyatakan hasil di luar dugaan berdasarkan status seseorang/sesuatu.",
    penjelasan: "Kata benda + にしては.",
    contoh: [{
      jp: "しょしんしゃに しては、じょうずです。",
      romaji: "Shoshinsha ni shite wa, jouzu desu.",
      id: "Untuk ukuran pemula, dia sudah mahir."
    }]
  },
  "〜にしても": {
    arti: "Menyatakan 'meskipun begitu/bahkan jika' — konsesi.",
    penjelasan: "Kata benda/kata kerja bentuk biasa + にしても.",
    contoh: [{
      jp: "いそがしいに しても、へんじぐらいは できます。",
      romaji: "Isogashii ni shitemo, henji gurai wa dekimasu.",
      id: "Meskipun sibuk, setidaknya bisa membalas."
    }]
  },
  "〜にしろ〜にしろ": {
    arti: "Menyatakan 'baik... maupun...' — mencakup dua kemungkinan.",
    penjelasan: "Kata benda + にしろ, diulang.",
    contoh: [{
      jp: "あめに しろ、はれに しろ、いきます。",
      romaji: "Ame ni shiro, hare ni shiro, ikimasu.",
      id: "Baik hujan maupun cerah, saya akan tetap pergi."
    }]
  },
  "〜であれ": {
    arti: "Menyatakan 'apapun/siapapun juga' — bentuk formal.",
    penjelasan: "Kata benda + であれ.",
    contoh: [{
      jp: "だれであれ、きそくを まもるべきです。",
      romaji: "Dare de are, kisoku o mamoru beki desu.",
      id: "Siapapun itu, seharusnya mematuhi aturan."
    }]
  },
  "〜くらい・ほど（ひかく）": {
    arti: "Menyatakan tingkat perbandingan — 'sampai sedemikian rupa'.",
    penjelasan: "Kalimat bentuk biasa + くらい/ほど.",
    contoh: [{
      jp: "なみだが でるほど かんどうしました。",
      romaji: "Namida ga deru hodo kandou shimashita.",
      id: "Terharu sampai keluar air mata."
    }]
  },
  "〜ば〜ほど": {
    arti: "Menyatakan proporsi — 'semakin... semakin...'.",
    penjelasan: "Kata kerja bentuk -ba + kata kerja bentuk kamus + ほど.",
    contoh: [{
      jp: "べんきょうすればするほど、わかるように なります。",
      romaji: "Benkyou sureba suru hodo, wakaru you ni narimasu.",
      id: "Semakin belajar, semakin mengerti."
    }]
  },
  "〜つつ": {
    arti: "Menyatakan dua tindakan bersamaan — versi formal/tulisan dari ながら.",
    penjelasan: "Kata kerja bentuk -masu (buang ます) + つつ.",
    contoh: [{
      jp: "あるきつつ、はなしましょう。",
      romaji: "Arukitsutsu, hanashimashou.",
      id: "Mari bicara sambil berjalan."
    }]
  },
  "〜がてら": {
    arti: "Menyatakan melakukan sesuatu sambil sekalian melakukan hal lain.",
    penjelasan: "Kata benda/kata kerja bentuk -masu (buang ます) + がてら.",
    contoh: [{
      jp: "さんぽがてら、かいものに いきます。",
      romaji: "Sanpo gatera, kaimono ni ikimasu.",
      id: "Sambil jalan-jalan, sekalian belanja."
    }]
  },
  "〜かたわら": {
    arti: "Menyatakan melakukan sesuatu di samping kegiatan utama — lebih formal dari がてら.",
    penjelasan: "Kata benda/kata kerja bentuk kamus + かたわら.",
    contoh: [{
      jp: "しごとの かたわら、だいがくに かよっています。",
      romaji: "Shigoto no katawara, daigaku ni kayotteimasu.",
      id: "Di samping bekerja, saya kuliah."
    }]
  },
  "〜あまり": {
    arti: "Menyatakan hasil dari suatu perasaan/tindakan berlebihan — 'karena terlalu'.",
    penjelasan: "Kata benda/kata kerja bentuk biasa + あまり.",
    contoh: [{
      jp: "しんぱいの あまり、ねむれませんでした。",
      romaji: "Shinpai no amari, nemuremasendeshita.",
      id: "Karena terlalu khawatir, saya tidak bisa tidur."
    }]
  },
  "〜せいか": {
    arti: "Menyatakan dugaan penyebab — 'mungkin karena'.",
    penjelasan: "Kata benda/kata kerja bentuk biasa + せいか.",
    contoh: [{
      jp: "としの せいか、つかれやすく なりました。",
      romaji: "Toshi no sei ka, tsukareyasuku narimashita.",
      id: "Mungkin karena usia, jadi mudah lelah."
    }]
  },
  "〜ことから": {
    arti: "Menyatakan asal-usul/alasan suatu penamaan atau kesimpulan.",
    penjelasan: "Kalimat bentuk biasa + ことから.",
    contoh: [{
      jp: "かたちが にていることから、その なまえが つきました。",
      romaji: "Katachi ga niteiru koto kara, sono namae ga tsukimashita.",
      id: "Karena bentuknya mirip, nama itu diberikan."
    }]
  },
  "〜ものなら": {
    arti: "Menyatakan pengandaian yang sulit terwujud — 'seandainya bisa'.",
    penjelasan: "Kata kerja bentuk potensial + ものなら.",
    contoh: [{
      jp: "できるものなら、やりたいです。",
      romaji: "Dekiru mono nara, yaritai desu.",
      id: "Seandainya bisa, saya ingin melakukannya."
    }]
  }
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "\u301C\u307E\u3058\u304D", {
  arti: "Menyatakan hal yang tidak sepantasnya dilakukan (sangat formal).",
  penjelasan: "Kata kerja bentuk kamus + まじき.",
  contoh: [{
    jp: "それは きょうしとして あるまじき こういです。",
    romaji: "Sore wa kyoushi toshite arumajiki koui desu.",
    id: "Itu perilaku yang tidak pantas dilakukan seorang guru."
  }]
}), "〜てからというもの", {
  arti: "Menyatakan perubahan besar sejak suatu momen — 'sejak saat itu'.",
  penjelasan: "Kata kerja bentuk -te + からというもの.",
  contoh: [{
    jp: "けっこんしてからというもの、せいかつが かわりました。",
    romaji: "Kekkon shite kara to iu mono, seikatsu ga kawarimashita.",
    id: "Sejak menikah, hidup saya berubah."
  }]
}), "〜おりに（は）", {
  arti: "Menyatakan 'pada kesempatan/saat itu' — formal dari とき.",
  penjelasan: "Kata benda/kata kerja bentuk kamus + おりに.",
  contoh: [{
    jp: "こんど おこしの おりには、ぜひ おたちよりください。",
    romaji: "Kondo okoshi no ori niwa, zehi otachiyori kudasai.",
    id: "Lain kali saat Anda berkunjung, silakan mampir."
  }]
}), "〜に至って", {
  arti: "Menyatakan mencapai suatu titik/tahap ekstrem — 'sampai ke titik'.",
  penjelasan: "Kata benda/kata kerja bentuk kamus + に至って.",
  contoh: [{
    jp: "この だんかいに いたって、あきらめるしか ありません。",
    romaji: "Kono dankai ni itatte, akirameru shika arimasen.",
    id: "Sampai tahap ini, tidak ada pilihan selain menyerah."
  }]
}), "〜を問わず", {
  arti: "Menyatakan 'tanpa memandang/terlepas dari' — netral pada semua kondisi.",
  penjelasan: "Kata benda + を問わず.",
  contoh: [{
    jp: "けいけんを とわず、おうぼできます。",
    romaji: "Keiken o towazu, oubo dekimasu.",
    id: "Bisa melamar tanpa memandang pengalaman."
  }]
}), "〜をめぐって", {
  arti: "Menyatakan 'seputar/mengenai' suatu isu yang diperdebatkan.",
  penjelasan: "Kata benda + をめぐって.",
  contoh: [{
    jp: "この もんだいを めぐって、ぎろんが おこりました。",
    romaji: "Kono mondai o megutte, giron ga okorimashita.",
    id: "Perdebatan muncul seputar masalah ini."
  }]
}), "〜をきっかけに", {
  arti: "Menyatakan momen yang menjadi 'titik awal/pemicu' suatu perubahan.",
  penjelasan: "Kata benda + をきっかけに.",
  contoh: [{
    jp: "びょうきを きっかけに、せいかつを かえました。",
    romaji: "Byouki o kikkake ni, seikatsu o kaemashita.",
    id: "Sakit itu menjadi titik awal saya mengubah gaya hidup."
  }]
}), "〜を通じて・を通して", {
  arti: "Menyatakan 'melalui' suatu perantara, atau 'sepanjang' suatu periode.",
  penjelasan: "Kata benda + を通じて/を通して.",
  contoh: [{
    jp: "インターネットを つうじて、しりあいました。",
    romaji: "Intaanetto o tsuujite, shiriaimashita.",
    id: "Kami berkenalan melalui internet."
  }]
}), "〜に伴って", {
  arti: "Menyatakan perubahan yang terjadi 'seiring dengan' hal lain.",
  penjelasan: "Kata benda/kata kerja bentuk kamus + に伴って.",
  contoh: [{
    jp: "じんこうの ぞうかに ともなって、じゅうたくが ふえました。",
    romaji: "Jinkou no zouka ni tomonatte, juutaku ga fuemashita.",
    id: "Seiring bertambahnya populasi, perumahan bertambah."
  }]
}), "〜に応じて", {
  arti: "Menyatakan 'sesuai dengan/menyesuaikan' suatu kondisi.",
  penjelasan: "Kata benda + に応じて.",
  contoh: [{
    jp: "のうりょくに おうじて、しごとを わけます。",
    romaji: "Nouryoku ni oujite, shigoto o wakemasu.",
    id: "Membagi pekerjaan sesuai kemampuan."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜を中心に", {
  arti: "Menyatakan 'berpusat pada' sesuatu.",
  penjelasan: "Kata benda + を中心に.",
  contoh: [{
    jp: "とうきょうを ちゅうしんに、かつどうしています。",
    romaji: "Toukyou o chuushin ni, katsudou shiteimasu.",
    id: "Beraktivitas berpusat di Tokyo."
  }]
}), "〜に加えて", {
  arti: "Menyatakan tambahan — 'selain itu, ditambah dengan'.",
  penjelasan: "Kata benda + に加えて.",
  contoh: [{
    jp: "えいごに くわえて、ちゅうごくごも べんきょうしています。",
    romaji: "Eigo ni kuwaete, chuugokugo mo benkyou shiteimasu.",
    id: "Selain bahasa Inggris, saya juga belajar bahasa Mandarin."
  }]
}), "〜はもちろん", {
  arti: "Menyatakan 'sudah tentu/apalagi' — hal yang jelas ditambah hal lain.",
  penjelasan: "Kata benda + はもちろん.",
  contoh: [{
    jp: "にほんごは もちろん、えいごも できます。",
    romaji: "Nihongo wa mochiron, eigo mo dekimasu.",
    id: "Bahasa Jepang sudah tentu bisa, bahasa Inggris juga bisa."
  }]
}), "〜と（しぜんなけっか）", {
  arti: "Menyatakan hasil alami/otomatis — kalau X terjadi, Y pasti terjadi.",
  penjelasan: "Kata kerja/kata sifat bentuk kamus + と, hasil harus otomatis (bukan ajakan/perintah).",
  contoh: [{
    jp: "はるに なると、さくらが さきます。",
    romaji: "Haru ni naru to, sakura ga sakimasu.",
    id: "Kalau musim semi tiba, bunga sakura mekar."
  }]
}), "〜だす", {
  arti: "Menyatakan tindakan yang TIBA-TIBA dimulai.",
  penjelasan: "Kata kerja bentuk -masu (buang ます) + だす.",
  contoh: [{
    jp: "あかちゃんが なきだしました。",
    romaji: "Akachan ga nakidashimashita.",
    id: "Bayi itu tiba-tiba menangis."
  }]
}), "〜たばかり", {
  arti: "Menyatakan sesuatu BARU SAJA selesai dilakukan.",
  penjelasan: "Kata kerja bentuk -ta + ばかり.",
  contoh: [{
    jp: "いま きたばかりです。",
    romaji: "Ima kita bakari desu.",
    id: "Saya baru saja datang."
  }]
}), "〜たところ", {
  arti: "Menyatakan momen TEPAT SAAT sesuatu selesai dilakukan.",
  penjelasan: "Kata kerja bentuk -ta + ところ.",
  contoh: [{
    jp: "しゅくだいが おわったところです。",
    romaji: "Shukudai ga owatta tokoro desu.",
    id: "PR-nya baru saja selesai."
  }]
}), "〜ているところ", {
  arti: "Menyatakan sedang DI TENGAH-TENGAH melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -te iru + ところ.",
  contoh: [{
    jp: "いま りょうりを つくっているところです。",
    romaji: "Ima ryouri o tsukutteiru tokoro desu.",
    id: "Sekarang sedang memasak."
  }]
}), "〜つもりだ", {
  arti: "Menyatakan niat/rencana pribadi.",
  penjelasan: "Kata kerja bentuk kamus/nai + つもりだ.",
  contoh: [{
    jp: "らいねん にほんに いくつもりです。",
    romaji: "Rainen Nihon ni iku tsumori desu.",
    id: "Saya berniat pergi ke Jepang tahun depan."
  }]
}), "〜よてい（予定）だ", {
  arti: "Menyatakan jadwal/rencana yang sudah ditetapkan.",
  penjelasan: "Kata kerja bentuk kamus + よていだ.",
  contoh: [{
    jp: "らいしゅう しゅっちょうする よていです。",
    romaji: "Raishuu shucchou suru yotei desu.",
    id: "Minggu depan sudah dijadwalkan dinas luar kota."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜ようにする", {
  arti: "Menyatakan usaha untuk membiasakan/mengupayakan sesuatu.",
  penjelasan: "Kata kerja bentuk kamus/nai + ようにする.",
  contoh: [{
    jp: "まいにち うんどうするように しています。",
    romaji: "Mainichi undou suru you ni shiteimasu.",
    id: "Saya mengusahakan olahraga setiap hari."
  }]
}), "〜ようになる", {
  arti: "Menyatakan perubahan kemampuan/kebiasaan — 'menjadi bisa/menjadi begini'.",
  penjelasan: "Kata kerja bentuk kamus/nai + ようになる.",
  contoh: [{
    jp: "にほんごが はなせるように なりました。",
    romaji: "Nihongo ga hanaseru you ni narimashita.",
    id: "Sekarang saya jadi bisa bicara bahasa Jepang."
  }]
}), "〜ことがある", {
  arti: "Menyatakan sesuatu 'kadang-kadang terjadi'.",
  penjelasan: "Kata kerja bentuk kamus/nai + ことがある.",
  contoh: [{
    jp: "たまに ちこくすることが あります。",
    romaji: "Tamani chikoku suru koto ga arimasu.",
    id: "Kadang-kadang saya terlambat."
  }]
}), "〜ことができる", {
  arti: "Menyatakan kemampuan — 'bisa/dapat melakukan'.",
  penjelasan: "Kata kerja bentuk kamus + ことができる.",
  contoh: [{
    jp: "かんじを よむことが できます。",
    romaji: "Kanji o yomu koto ga dekimasu.",
    id: "Saya bisa membaca kanji."
  }]
}), "〜し〜し", {
  arti: "Menyebutkan beberapa alasan/sifat sekaligus — 'selain itu... juga'.",
  penjelasan: "Kalimat bentuk biasa + し, diulang untuk tiap alasan.",
  contoh: [{
    jp: "この まちは べんりだし、しずかだし、すきです。",
    romaji: "Kono machi wa benri da shi, shizuka da shi, suki desu.",
    id: "Kota ini praktis, juga tenang, saya suka."
  }]
}), "〜てほしい", {
  arti: "Menyatakan keinginan agar orang lain melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -te + ほしい.",
  contoh: [{
    jp: "はやく きてほしいです。",
    romaji: "Hayaku kite hoshii desu.",
    id: "Saya ingin (kamu) datang cepat."
  }]
}), "〜において", {
  arti: "Menyatakan 'di/dalam' konteks formal — tempat, bidang, atau situasi.",
  penjelasan: "Kata benda + において.",
  contoh: [{
    jp: "にほんに おいて、けいごは たいせつです。",
    romaji: "Nihon ni oite, keigo wa taisetsu desu.",
    id: "Di Jepang, bahasa hormat itu penting."
  }]
}), "〜にかんして", {
  arti: "Menyatakan 'mengenai/terkait dengan' topik tertentu, gaya formal.",
  penjelasan: "Kata benda + にかんして.",
  contoh: [{
    jp: "けいざいに かんして、はなしました。",
    romaji: "Keizai ni kanshite, hanashimashita.",
    id: "Kami membicarakan mengenai ekonomi."
  }]
}), "〜について", {
  arti: "Menyatakan 'tentang' suatu topik, lebih umum dari にかんして.",
  penjelasan: "Kata benda + について.",
  contoh: [{
    jp: "にほんの ぶんかについて、しりたいです。",
    romaji: "Nihon no bunka ni tsuite, shiritai desu.",
    id: "Saya ingin tahu tentang budaya Jepang."
  }]
}), "〜として", {
  arti: "Menyatakan peran/kedudukan — 'sebagai'.",
  penjelasan: "Kata benda + として.",
  contoh: [{
    jp: "かれは せんせいとして はたらいています。",
    romaji: "Kare wa sensei toshite hataraiteimasu.",
    id: "Dia bekerja sebagai guru."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜によって", {
  arti: "Menyatakan sebab/sarana, atau 'tergantung pada'.",
  penjelasan: "Kata benda + によって.",
  contoh: [{
    jp: "ひとに よって、かんがえかたが ちがいます。",
    romaji: "Hito ni yotte, kangaekata ga chigaimasu.",
    id: "Tergantung orangnya, cara berpikirnya berbeda."
  }]
}), "〜わけだ", {
  arti: "Menyatakan kesimpulan logis — 'berarti/pantas saja'.",
  penjelasan: "Kalimat bentuk biasa + わけだ.",
  contoh: [{
    jp: "さむいわけです。ゆきが ふっていますから。",
    romaji: "Samui wake desu. Yuki ga futteimasu kara.",
    id: "Pantas saja dingin. Karena sedang turun salju."
  }]
}), "〜わけがない", {
  arti: "Menyatakan keyakinan kuat — 'tidak mungkin'.",
  penjelasan: "Kalimat bentuk biasa + わけがない.",
  contoh: [{
    jp: "かれが うそを つくわけが ありません。",
    romaji: "Kare ga uso o tsuku wake ga arimasen.",
    id: "Tidak mungkin dia berbohong."
  }]
}), "〜べきだ", {
  arti: "Menyatakan kewajiban moral — 'seharusnya/sepatutnya'.",
  penjelasan: "Kata kerja bentuk kamus + べきだ.",
  contoh: [{
    jp: "やくそくは まもるべきです。",
    romaji: "Yakusoku wa mamoru beki desu.",
    id: "Janji seharusnya ditepati."
  }]
}), "〜しかない", {
  arti: "Menyatakan 'hanya tinggal' satu pilihan — tidak ada cara lain.",
  penjelasan: "Kata kerja bentuk kamus + しかない.",
  contoh: [{
    jp: "もう あきらめるしか ありません。",
    romaji: "Mou akirameru shika arimasen.",
    id: "Tidak ada pilihan lain selain menyerah."
  }]
}), "〜たがる", {
  arti: "Menyatakan orang LAIN (bukan pembicara) ingin melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -masu (buang ます) + たがる.",
  contoh: [{
    jp: "こどもは あそびたがっています。",
    romaji: "Kodomo wa asobitagatteimasu.",
    id: "Anak itu ingin bermain."
  }]
}), "〜がる", {
  arti: "Menyatakan orang lain menunjukkan tanda-tanda suatu perasaan.",
  penjelasan: "Kata sifat (buang い/な) + がる.",
  contoh: [{
    jp: "いもうとは さむがっています。",
    romaji: "Imouto wa samugatteimasu.",
    id: "Adik perempuan saya kelihatan kedinginan."
  }]
}), "〜かどうか", {
  arti: "Menyatakan 'apakah atau tidak' — ketidakpastian.",
  penjelasan: "Kalimat bentuk biasa + かどうか.",
  contoh: [{
    jp: "かれが くるかどうか わかりません。",
    romaji: "Kare ga kuru ka dou ka wakarimasen.",
    id: "Saya tidak tahu apakah dia akan datang atau tidak."
  }]
}), "〜か〜か", {
  arti: "Menyatakan pilihan di antara dua hal.",
  penjelasan: "Kata benda/kata kerja + か + kata benda/kata kerja + か.",
  contoh: [{
    jp: "コーヒーか おちゃか、どちらが いいですか。",
    romaji: "Koohii ka ocha ka, dochira ga ii desu ka.",
    id: "Kopi atau teh, mana yang lebih baik?"
  }]
}), "〜さえ", {
  arti: "Menyatakan 'bahkan' — penekanan pada hal ekstrem.",
  penjelasan: "Kata benda + さえ.",
  contoh: [{
    jp: "かんじさえ よめません。",
    romaji: "Kanji sae yomemasen.",
    id: "Bahkan kanji pun saya tidak bisa baca."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜だけでなく", {
  arti: "Menyatakan 'bukan hanya... tapi juga'.",
  penjelasan: "Kata benda/kalimat + だけでなく.",
  contoh: [{
    jp: "えいごだけでなく、ちゅうごくごも はなせます。",
    romaji: "Eigo dake de naku, chuugokugo mo hanasemasu.",
    id: "Bukan hanya bahasa Inggris, saya juga bisa bahasa Mandarin."
  }]
}), "〜たびに", {
  arti: "Menyatakan 'setiap kali' sesuatu terjadi.",
  penjelasan: "Kata kerja bentuk kamus + たびに.",
  contoh: [{
    jp: "にほんに いくたびに、おみやげを かいます。",
    romaji: "Nihon ni iku tabi ni, omiyage o kaimasu.",
    id: "Setiap kali pergi ke Jepang, saya membeli oleh-oleh."
  }]
}), "\u301C\u305B\u3044\u3067", {
  arti: "Menyatakan penyebab suatu hal BURUK/negatif — 'gara-gara'.",
  penjelasan: "Kata benda/kata kerja bentuk biasa + せいで.",
  contoh: [{
    jp: "あめの せいで、でかけられません。",
    romaji: "Ame no sei de, dekakeraremasen.",
    id: "Gara-gara hujan, saya tidak bisa keluar."
  }]
}), "〜てはじめて", {
  arti: "Menyatakan 'baru setelah melakukan X, sadar Y' — realisasi setelah pengalaman.",
  penjelasan: "Kata kerja bentuk -te + はじめて.",
  contoh: [{
    jp: "にほんに きてはじめて、ふるさとの よさが わかりました。",
    romaji: "Nihon ni kite hajimete, furusato no yosa ga wakarimashita.",
    id: "Baru setelah datang ke Jepang, saya menyadari kebaikan kampung halaman."
  }]
}), "〜くせに", {
  arti: "Menyatakan pertentangan dengan nada kritis/sinis — 'padahal (kok malah)'.",
  penjelasan: "Kalimat bentuk biasa + くせに.",
  contoh: [{
    jp: "わかいくせに、いつも つかれたと いっています。",
    romaji: "Wakai kuse ni, itsumo tsukareta to itteimasu.",
    id: "Padahal masih muda, selalu bilang capek."
  }]
}), "〜からといって", {
  arti: "Menyatakan 'meskipun/hanya karena X, bukan berarti Y'.",
  penjelasan: "Kalimat bentuk biasa + からといって, diikuti pernyataan penyangkalan.",
  contoh: [{
    jp: "にほんじんだからといって、みんな かんじが とくいとは かぎりません。",
    romaji: "Nihonjin da kara to itte, minna kanji ga tokui to wa kagirimasen.",
    id: "Meski orang Jepang, bukan berarti semua jago kanji."
  }]
}), "〜みたいだ", {
  arti: "Menyatakan dugaan berdasarkan pengamatan — versi santai dari ようだ.",
  penjelasan: "Kata benda/kata kerja bentuk biasa + みたいだ.",
  contoh: [{
    jp: "あめが ふるみたいです。",
    romaji: "Ame ga furu mitai desu.",
    id: "Sepertinya akan hujan."
  }]
}), "〜っぽい", {
  arti: "Menyatakan kesan 'seperti/kecenderungan' pada sesuatu.",
  penjelasan: "Kata benda/kata kerja bentuk -masu (buang ます) + っぽい.",
  contoh: [{
    jp: "あの ひとは こどもっぽいです。",
    romaji: "Ano hito wa kodomoppoi desu.",
    id: "Orang itu kekanak-kanakan."
  }]
}), "〜がち", {
  arti: "Menyatakan 'cenderung/sering terjadi' (biasanya hal kurang baik).",
  penjelasan: "Kata kerja bentuk -masu (buang ます) + がち.",
  contoh: [{
    jp: "さいきん、わすれがちです。",
    romaji: "Saikin, wasuregachi desu.",
    id: "Belakangan ini, saya jadi sering lupa."
  }]
}), "〜きる", {
  arti: "Menyatakan melakukan sesuatu SAMPAI TUNTAS/habis.",
  penjelasan: "Kata kerja bentuk -masu (buang ます) + きる.",
  contoh: [{
    jp: "みずを のみきりました。",
    romaji: "Mizu o nomikirimashita.",
    id: "Saya menghabiskan airnya sampai tuntas."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "かのうけい（〜える・〜られる）", {
  arti: "Bentuk potensial — menyatakan 'bisa melakukan' (mirip ことができる tapi lebih ringkas).",
  penjelasan: "Kata kerja diubah langsung ke bentuk potensial per grup kata kerja.",
  contoh: [{
    jp: "さしみが たべられます。",
    romaji: "Sashimi ga taberaremasu.",
    id: "Saya bisa makan sashimi."
  }]
}), "〜ながらも", {
  arti: "Menyatakan pertentangan — 'meskipun sambil melakukan X, tetap Y'.",
  penjelasan: "Kata kerja bentuk -masu (buang ます)/kata sifat + ながらも.",
  contoh: [{
    jp: "わかっていながらも、やめられません。",
    romaji: "Wakatteinagara mo, yameraremasen.",
    id: "Meskipun sudah tahu, tetap tidak bisa berhenti."
  }]
}), "そんけいご（どうし）", {
  arti: "Kata kerja hormat khusus untuk meninggikan lawan bicara/orang yang dihormati.",
  penjelasan: "Contoh: いく/くる/いる→いらっしゃる, いう→おっしゃる, たべる→めしあがる, する→なさる.",
  contoh: [{
    jp: "なにを めしあがりますか。",
    romaji: "Nani o meshiagarimasu ka.",
    id: "Anda mau makan apa? (bentuk hormat)"
  }]
}), "けんじょうご（どうし）", {
  arti: "Kata kerja merendah khusus untuk merendahkan diri sendiri di hadapan orang yang dihormati.",
  penjelasan: "Contoh: いく/くる→まいる, いう→もうす, たべる→いただく, する→いたす.",
  contoh: [{
    jp: "わたしが まいります。",
    romaji: "Watashi ga mairimasu.",
    id: "Saya yang akan datang (bentuk merendah)."
  }]
}), "お＋どうし（ますけい）＋になる", {
  arti: "Pola pembentuk bahasa hormat umum — meninggikan tindakan lawan bicara.",
  penjelasan: "お + kata kerja bentuk -masu (buang ます) + になる.",
  contoh: [{
    jp: "せんせいは もう おかえりに なりました。",
    romaji: "Sensei wa mou okaeri ni narimashita.",
    id: "Guru sudah pulang (bentuk hormat)."
  }]
}), "お＋どうし（ますけい）＋する", {
  arti: "Pola pembentuk bahasa merendah umum — merendahkan tindakan diri sendiri.",
  penjelasan: "お + kata kerja bentuk -masu (buang ます) + する.",
  contoh: [{
    jp: "にもつを おもちします。",
    romaji: "Nimotsu o omochi shimasu.",
    id: "Saya akan membawakan barangnya (bentuk merendah)."
  }]
}), "〜ていただけますか", {
  arti: "Permintaan sopan formal — 'bolehkah saya minta tolong...'.",
  penjelasan: "Kata kerja bentuk -te + いただけますか.",
  contoh: [{
    jp: "てつだって いただけますか。",
    romaji: "Tetsudatte itadakemasu ka.",
    id: "Bisakah saya minta tolong dibantu?"
  }]
}), "〜させていただきます", {
  arti: "Menyatakan izin untuk melakukan sesuatu dengan sangat sopan/merendah.",
  penjelasan: "Kata kerja bentuk kausatif + ていただきます.",
  contoh: [{
    jp: "さきに かえらせて いただきます。",
    romaji: "Sakini kaerasete itadakimasu.",
    id: "Izinkan saya pulang duluan."
  }]
}), "〜てくれませんか", {
  arti: "Permintaan tolong yang sopan — 'maukah kamu...'.",
  penjelasan: "Kata kerja bentuk -te + くれませんか.",
  contoh: [{
    jp: "まどを あけてくれませんか。",
    romaji: "Mado o aketekuremasen ka.",
    id: "Maukah kamu membuka jendela?"
  }]
}), "〜てもかまいません", {
  arti: "Menyatakan izin — 'tidak masalah kalau...', mirip てもいいです tapi lebih formal.",
  penjelasan: "Kata kerja bentuk -te + もかまいません.",
  contoh: [{
    jp: "ここに おいても かまいません。",
    romaji: "Koko ni oitemo kamaimasen.",
    id: "Tidak masalah kalau diletakkan di sini."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜まま", {
  arti: "Menyatakan suatu keadaan tetap TIDAK BERUBAH selagi hal lain terjadi.",
  penjelasan: "Kata kerja bentuk -ta / kata benda + の + まま.",
  contoh: [{
    jp: "くつを はいたまま、いえに はいりました。",
    romaji: "Kutsu o haita mama, ie ni hairimashita.",
    id: "Masuk rumah dengan sepatu masih terpakai."
  }]
}), "すうりょう＋も（きょうちょう）", {
  arti: "Menyatakan jumlah yang mengesankan banyak — 'sampai sebanyak'.",
  penjelasan: "Angka/jumlah + も.",
  contoh: [{
    jp: "ビールを ごほんも のみました。",
    romaji: "Biiru o gohon mo nomimashita.",
    id: "Saya minum bir sampai 5 botol."
  }]
}), "すうりょう＋しか＋ひてい", {
  arti: "Menyatakan jumlah yang mengesankan sedikit — 'hanya sebanyak'.",
  penjelasan: "Angka/jumlah + しか + bentuk negatif.",
  contoh: [{
    jp: "さんぷんしか ありません。",
    romaji: "Sanpun shika arimasen.",
    id: "Hanya ada 3 menit saja."
  }]
}), "〜にとって", {
  arti: "Menyatakan 'bagi/dari sudut pandang' seseorang.",
  penjelasan: "Kata benda (orang) + にとって.",
  contoh: [{
    jp: "わたしにとって、かぞくが いちばん たいせつです。",
    romaji: "Watashi ni totte, kazoku ga ichiban taisetsu desu.",
    id: "Bagi saya, keluarga adalah yang paling penting."
  }]
}), "〜にちがいない", {
  arti: "Menyatakan keyakinan kuat — 'pasti/tidak salah lagi'.",
  penjelasan: "Kalimat bentuk biasa + にちがいない.",
  contoh: [{
    jp: "かれは つかれているに ちがいありません。",
    romaji: "Kare wa tsukareteiru ni chigai arimasen.",
    id: "Dia pasti sedang lelah."
  }]
}), "おそらく〜だろう", {
  arti: "Menyatakan dugaan kuat — 'kemungkinan besar'.",
  penjelasan: "おそらく di awal kalimat, diakhiri bentuk だろう/でしょう.",
  contoh: [{
    jp: "おそらく かれは こないだろう。",
    romaji: "Osoraku kare wa konai darou.",
    id: "Kemungkinan besar dia tidak akan datang."
  }]
}), "〜わりに", {
  arti: "Menyatakan 'padahal/dibandingkan dengan' — hasil tidak sesuai ekspektasi terhadap suatu kondisi.",
  penjelasan: "Kata benda/kata kerja bentuk biasa + わりに.",
  contoh: [{
    jp: "やすいわりに、おいしいです。",
    romaji: "Yasui wari ni, oishii desu.",
    id: "Padahal murah, tapi enak."
  }]
}), "〜までに", {
  arti: "Menyatakan batas waktu — 'paling lambat sampai/sebelum'.",
  penjelasan: "Waktu/kata kerja bentuk kamus + までに.",
  contoh: [{
    jp: "あした までに、レポートを だしてください。",
    romaji: "Ashita made ni, repooto o dashite kudasai.",
    id: "Tolong kumpulkan laporan paling lambat besok."
  }]
}), "〜れる・られる（うけみ）", {
  arti: "Bentuk pasif — menyatakan subjek DIKENAI suatu tindakan (bukan pelaku).",
  penjelasan: "Kata kerja diubah ke bentuk pasif: グループ1 akhiran -u→-areru, グループ2 tambah -rareru.",
  contoh: [{
    jp: "せんせいに しかられました。",
    romaji: "Sensei ni shikararemashita.",
    id: "Saya dimarahi oleh guru."
  }]
}), "〜せる・させる（しえき）", {
  arti: "Bentuk kausatif — menyatakan MENYURUH/MEMBIARKAN orang lain melakukan sesuatu.",
  penjelasan: "Kata kerja diubah ke bentuk kausatif: グループ1 akhiran -u→-aseru, グループ2 tambah -saseru.",
  contoh: [{
    jp: "ははは わたしに へやを そうじさせました。",
    romaji: "Haha wa watashi ni heya o souji sasemashita.",
    id: "Ibu menyuruh saya membersihkan kamar."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜ば", {
  arti: "Bentuk kondisional 'jika/kalau' — pengandaian umum.",
  penjelasan: "Kata kerja/kata sifat diubah ke bentuk -ba.",
  contoh: [{
    jp: "やすければ、かいます。",
    romaji: "Yasukereba, kaimasu.",
    id: "Kalau murah, saya akan membeli."
  }]
}), "〜たら", {
  arti: "Bentuk kondisional 'kalau/setelah' — lebih fleksibel, bisa untuk syarat maupun waktu.",
  penjelasan: "Kata kerja bentuk -ta + ら.",
  contoh: [{
    jp: "あめが ふったら、いえに います。",
    romaji: "Ame ga futtara, ie ni imasu.",
    id: "Kalau hujan turun, saya akan di rumah."
  }]
}), "〜なら", {
  arti: "Bentuk kondisional 'kalau begitu' — merespons topik yang baru disebut.",
  penjelasan: "Kata benda/kata kerja bentuk kamus + なら.",
  contoh: [{
    jp: "にほんに いくなら、パスポートが ひつようです。",
    romaji: "Nihon ni iku nara, pasupooto ga hitsuyou desu.",
    id: "Kalau (mau) pergi ke Jepang, paspor diperlukan."
  }]
}), "〜そうです（でんぶん）", {
  arti: "Menyatakan 'katanya/menurut kabar' — informasi dari sumber lain, bukan pendapat sendiri.",
  penjelasan: "Kalimat bentuk biasa (futsuukei) + そうです.",
  contoh: [{
    jp: "てんきよほうに よると、あした あめが ふるそうです。",
    romaji: "Tenki yohou ni yoru to, ashita ame ga furu sou desu.",
    id: "Menurut ramalan cuaca, katanya besok akan hujan."
  }]
}), "〜ようです", {
  arti: "Menyatakan dugaan berdasarkan pengamatan/perasaan sendiri — 'sepertinya'.",
  penjelasan: "Kata kerja/kata sifat bentuk biasa + ようです.",
  contoh: [{
    jp: "だれも いないようです。",
    romaji: "Dare mo inai you desu.",
    id: "Sepertinya tidak ada siapa-siapa."
  }]
}), "〜らしいです", {
  arti: "Menyatakan dugaan berdasarkan informasi yang didengar — mirip そうです tapi lebih kasual.",
  penjelasan: "Kata benda/kata kerja bentuk biasa + らしいです.",
  contoh: [{
    jp: "かれは いそがしいらしいです。",
    romaji: "Kare wa isogashii rashii desu.",
    id: "Katanya dia sibuk."
  }]
}), "〜ておく", {
  arti: "Menyatakan melakukan sesuatu SEBAGAI PERSIAPAN untuk nanti.",
  penjelasan: "Kata kerja bentuk -te + おく.",
  contoh: [{
    jp: "りょこうの まえに、きっぷを かっておきます。",
    romaji: "Ryokou no mae ni, kippu o katteokimasu.",
    id: "Sebelum bepergian, saya membeli tiket terlebih dahulu (sebagai persiapan)."
  }]
}), "〜てしまう", {
  arti: "Menyatakan suatu tindakan SELESAI TUNTAS, atau menyesal telah melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -te + しまう.",
  contoh: [{
    jp: "しゅくだいを ぜんぶ やってしまいました。",
    romaji: "Shukudai o zenbu yatteshimaimashita.",
    id: "Saya sudah menyelesaikan semua PR."
  }]
}), "〜あいだ・あいだに", {
  arti: "Menyatakan 'selama' suatu periode waktu, atau 'di antara' waktu itu terjadi sesuatu.",
  penjelasan: "Kalimat bentuk biasa + あいだ(に).",
  contoh: [{
    jp: "こどもが ねている あいだに、そうじします。",
    romaji: "Kodomo ga neteiru aida ni, soujishimasu.",
    id: "Selagi anak tidur, saya membersihkan rumah."
  }]
}), "〜なさい", {
  arti: "Perintah yang agak lembut, biasa dipakai orang tua/guru kepada anak/murid.",
  penjelasan: "Kata kerja bentuk -masu (buang ます) + なさい.",
  contoh: [{
    jp: "はやく ねなさい。",
    romaji: "Hayaku nenasai.",
    id: "Cepat tidur."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜すぎる", {
  arti: "Menyatakan 'terlalu' — sesuatu melebihi batas wajar.",
  penjelasan: "Kata kerja bentuk -masu (buang ます) atau kata sifat (buang い/な) + すぎる.",
  contoh: [{
    jp: "たべすぎました。",
    romaji: "Tabesugimashita.",
    id: "Saya makan terlalu banyak."
  }]
}), "〜やすい・にくい", {
  arti: "Menyatakan 'mudah/sulit' untuk dilakukan.",
  penjelasan: "Kata kerja bentuk -masu (buang ます) + やすい (mudah) / にくい (sulit).",
  contoh: [{
    jp: "この ペンは かきやすいです。",
    romaji: "Kono pen wa kakiyasui desu.",
    id: "Pulpen ini mudah dipakai menulis."
  }]
}), "〜かもしれません", {
  arti: "Menyatakan kemungkinan — 'mungkin saja'.",
  penjelasan: "Kalimat bentuk biasa + かもしれません.",
  contoh: [{
    jp: "あした あめが ふるかもしれません。",
    romaji: "Ashita ame ga furu kamoshiremasen.",
    id: "Besok mungkin saja hujan."
  }]
}), "〜はずです", {
  arti: "Menyatakan keyakinan kuat berdasarkan logika/informasi — 'seharusnya'.",
  penjelasan: "Kalimat bentuk biasa + はずです.",
  contoh: [{
    jp: "かれは にほんごが じょうずな はずです。",
    romaji: "Kare wa nihongo ga jouzu na hazu desu.",
    id: "Dia seharusnya pandai bahasa Jepang."
  }]
}), "〜のに", {
  arti: "Menyatakan pertentangan/kekecewaan — 'padahal'.",
  penjelasan: "Kalimat bentuk biasa + のに.",
  contoh: [{
    jp: "いっしょうけんめい べんきょうしたのに、おちました。",
    romaji: "Isshoukenmei benkyoushita noni, ochimashita.",
    id: "Padahal sudah belajar sungguh-sungguh, (tetap) gagal."
  }]
}), "〜ばかり", {
  arti: "Menyatakan 'hanya/melulu' — melakukan satu hal terus-menerus.",
  penjelasan: "Kata benda/kata kerja bentuk -te + ばかり.",
  contoh: [{
    jp: "かれは あそんでばかり います。",
    romaji: "Kare wa asonde bakari imasu.",
    id: "Dia main melulu."
  }]
}), "〜おわる・はじめる・つづける", {
  arti: "Kata kerja bantu untuk menyatakan 'selesai/mulai/lanjut' melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -masu (buang ます) + おわる/はじめる/つづける.",
  contoh: [{
    jp: "ごはんを たべおわりました。",
    romaji: "Gohan o tabeowarimashita.",
    id: "Saya selesai makan."
  }]
}), "〜ながら", {
  arti: "Menyatakan melakukan dua hal SEKALIGUS — 'sambil'.",
  penjelasan: "Kata kerja bentuk -masu (buang ます) + ながら.",
  contoh: [{
    jp: "おんがくを ききながら、べんきょうします。",
    romaji: "Ongaku o kikinagara, benkyoushimasu.",
    id: "Belajar sambil mendengarkan musik."
  }]
}), "〜てもらいたい・ほしい", {
  arti: "Menyatakan keinginan agar orang lain melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -te + もらいたい/ほしい.",
  contoh: [{
    jp: "てつだって ほしいです。",
    romaji: "Tetsudatte hoshii desu.",
    id: "Saya ingin (kamu) membantu."
  }]
}), "〜ことにする", {
  arti: "Menyatakan keputusan pribadi yang diambil — 'memutuskan untuk'.",
  penjelasan: "Kata kerja bentuk kamus/nai + ことにする.",
  contoh: [{
    jp: "らいねん にほんに いくことに しました。",
    romaji: "Rainen Nihon ni iku koto ni shimashita.",
    id: "Saya memutuskan untuk pergi ke Jepang tahun depan."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜ことになる", {
  arti: "Menyatakan hasil keputusan yang ditentukan pihak lain/keadaan — 'menjadi ditentukan bahwa'.",
  penjelasan: "Kata kerja bentuk kamus/nai + ことになる.",
  contoh: [{
    jp: "らいげつ、てんきんすることに なりました。",
    romaji: "Raigetsu, tenkin suru koto ni narimashita.",
    id: "Bulan depan, sudah ditentukan saya akan dipindahtugaskan."
  }]
}), "尊敬語・謙譲語（きほん）", {
  arti: "Pengantar bahasa hormat (keigo) — cara bicara sopan pada atasan/orang yang dihormati.",
  penjelasan: "尊敬語 meninggikan lawan bicara (ex: いらっしゃる=datang/pergi/ada), 謙譲語 merendahkan diri sendiri (ex: まいる=pergi/datang).",
  contoh: [{
    jp: "しゃちょうは もう いらっしゃいました。",
    romaji: "Shachou wa mou irasshaimashita.",
    id: "Direktur sudah tiba (bentuk hormat)."
  }]
}), "〜が", {
  arti: "Partikel penanda subjek — menunjukkan siapa/apa yang melakukan tindakan atau menegaskan info baru.",
  penjelasan: "Diletakkan setelah kata benda yang menjadi subjek kalimat.",
  contoh: [{
    jp: "かぜが ふいています。",
    romaji: "Kaze ga fuiteimasu.",
    id: "Angin sedang bertiup."
  }]
}), "〜で", {
  arti: "Partikel penanda tempat kegiatan atau alat/cara melakukan sesuatu.",
  penjelasan: "Diletakkan setelah kata benda tempat/alat.",
  contoh: [{
    jp: "としょかんで べんきょうします。",
    romaji: "Toshokan de benkyoushimasu.",
    id: "Belajar di perpustakaan."
  }, {
    jp: "バスで がっこうへ いきます。",
    romaji: "Basu de gakkou e ikimasu.",
    id: "Pergi ke sekolah naik bus."
  }]
}), "〜の", {
  arti: "Partikel penanda kepemilikan atau penjelas antar kata benda.",
  penjelasan: "Menghubungkan dua kata benda, kata benda pertama menjelaskan yang kedua.",
  contoh: [{
    jp: "これは わたしの ほんです。",
    romaji: "Kore wa watashi no hon desu.",
    id: "Ini buku saya."
  }]
}), "〜と", {
  arti: "Partikel 'dan' untuk menghubungkan kata benda, atau menyatakan orang yang menyertai.",
  penjelasan: "Diletakkan di antara dua kata benda, atau setelah orang yang menyertai kegiatan.",
  contoh: [{
    jp: "かぞくと りょこうします。",
    romaji: "Kazoku to ryokoushimasu.",
    id: "Bepergian bersama keluarga."
  }, {
    jp: "パンと たまごを かいました。",
    romaji: "Pan to tamago o kaimashita.",
    id: "Membeli roti dan telur."
  }]
}), "〜か（しつもんぶん）", {
  arti: "Partikel yang membuat kalimat menjadi kalimat tanya.",
  penjelasan: "Diletakkan di akhir kalimat, menggantikan tanda tanya.",
  contoh: [{
    jp: "あなたは がくせいですか。",
    romaji: "Anata wa gakusei desu ka.",
    id: "Apakah kamu murid?"
  }]
}), "〜ね", {
  arti: "Partikel akhir untuk meminta persetujuan atau menegaskan sesuatu bersama lawan bicara.",
  penjelasan: "Diletakkan di akhir kalimat, mirip 'kan?' dalam Bahasa Indonesia.",
  contoh: [{
    jp: "いい てんきですね。",
    romaji: "Ii tenki desu ne.",
    id: "Cuacanya bagus, ya?"
  }]
}), "〜よ", {
  arti: "Partikel akhir untuk memberi tahu atau menegaskan info yang mungkin belum diketahui lawan bicara.",
  penjelasan: "Diletakkan di akhir kalimat, seperti 'lho/loh' dalam Bahasa Indonesia.",
  contoh: [{
    jp: "あしたは やすみですよ。",
    romaji: "Ashita wa yasumi desu yo.",
    id: "Besok libur, lho!"
  }]
}), "これ・それ・あれ・どれ", {
  arti: "Kata tunjuk untuk BENDA — 'ini/itu(dekat)/itu(jauh)/yang mana'.",
  penjelasan: "これ=dekat pembicara, それ=dekat lawan bicara, あれ=jauh dari keduanya, どれ=pertanyaan.",
  contoh: [{
    jp: "これは わたしの かさです。",
    romaji: "Kore wa watashi no kasa desu.",
    id: "Ini payung saya."
  }, {
    jp: "あれは なんですか。",
    romaji: "Are wa nan desu ka.",
    id: "Itu (yang jauh) apa?"
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "この・その・あの・どの＋めいし", {
  arti: "Kata tunjuk penjelas sebelum kata benda — 'kata benda ini/itu/itu(jauh)/yang mana'.",
  penjelasan: "Selalu diikuti kata benda langsung setelahnya, tidak berdiri sendiri seperti これ dst.",
  contoh: [{
    jp: "この ほんは おもしろいです。",
    romaji: "Kono hon wa omoshiroi desu.",
    id: "Buku ini menarik."
  }]
}), "ここ・そこ・あそこ・どこ", {
  arti: "Kata tunjuk untuk TEMPAT — 'sini/situ/sana/mana'.",
  penjelasan: "ここ=dekat pembicara, そこ=dekat lawan bicara, あそこ=jauh dari keduanya, どこ=pertanyaan.",
  contoh: [{
    jp: "トイレは あそこです。",
    romaji: "Toire wa asoko desu.",
    id: "Toiletnya di sana."
  }]
}), "〜てもいいです", {
  arti: "Menyatakan izin — boleh melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -te + もいいです.",
  contoh: [{
    jp: "ここに すわっても いいですか。",
    romaji: "Koko ni suwatte mo ii desu ka.",
    id: "Bolehkah saya duduk di sini?"
  }]
}), "〜がいます", {
  arti: "Menyatakan keberadaan makhluk hidup (orang/hewan) di suatu tempat.",
  penjelasan: "Beda dengan あります yang untuk benda mati; います khusus makhluk hidup.",
  contoh: [{
    jp: "にわに ねこが います。",
    romaji: "Niwa ni neko ga imasu.",
    id: "Ada kucing di halaman."
  }]
}), "でも", {
  arti: "Konjungsi 'tapi/namun' di awal kalimat baru.",
  penjelasan: "Diletakkan di awal kalimat kedua untuk menunjukkan pertentangan dengan kalimat sebelumnya.",
  contoh: [{
    jp: "あめです。でも、でかけます。",
    romaji: "Ame desu. Demo, dekakemasu.",
    id: "Hujan. Tapi, saya tetap keluar."
  }]
}), "そして", {
  arti: "Konjungsi 'lalu/dan' untuk menyambung dua kalimat/tindakan berurutan.",
  penjelasan: "Diletakkan di awal kalimat kedua.",
  contoh: [{
    jp: "あさごはんを たべました。そして、がっこうへ いきました。",
    romaji: "Asagohan o tabemashita. Soshite, gakkou e ikimashita.",
    id: "Saya sarapan. Lalu, pergi ke sekolah."
  }]
}), "それから", {
  arti: "Konjungsi 'setelah itu/kemudian'.",
  penjelasan: "Diletakkan di awal kalimat kedua, mirip そして tapi lebih menekankan urutan waktu.",
  contoh: [{
    jp: "しゅくだいを しました。それから、ねました。",
    romaji: "Shukudai o shimashita. Sorekara, nemashita.",
    id: "Saya mengerjakan PR. Setelah itu, tidur."
  }]
}), "〜てみます", {
  arti: "Menyatakan 'mencoba' melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -te + みます.",
  contoh: [{
    jp: "この りょうりを たべてみます。",
    romaji: "Kono ryouri o tabetemimasu.",
    id: "Saya akan coba makan masakan ini."
  }]
}), "〜てもらいます", {
  arti: "Menyatakan menerima suatu tindakan/bantuan dari orang lain.",
  penjelasan: "Kata kerja bentuk -te + もらいます, subjek adalah penerima bantuan.",
  contoh: [{
    jp: "ともだちに てつだって もらいました。",
    romaji: "Tomodachi ni tetsudatte moraimashita.",
    id: "Saya dibantu oleh teman."
  }]
}), "〜てあげます", {
  arti: "Menyatakan memberi bantuan/tindakan untuk orang lain.",
  penjelasan: "Kata kerja bentuk -te + あげます, subjek adalah pemberi bantuan.",
  contoh: [{
    jp: "ともだちに ほんを かして あげました。",
    romaji: "Tomodachi ni hon o kashite agemashita.",
    id: "Saya meminjamkan buku ke teman."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜てくれます", {
  arti: "Menyatakan orang lain melakukan sesuatu UNTUK kita (menguntungkan pembicara).",
  penjelasan: "Kata kerja bentuk -te + くれます.",
  contoh: [{
    jp: "ともだちが てつだって くれました。",
    romaji: "Tomodachi ga tetsudatte kuremashita.",
    id: "Teman saya membantu (saya)."
  }]
}), "〜ぐらい・くらい", {
  arti: "Menyatakan perkiraan jumlah/waktu — 'kira-kira/sekitar'.",
  penjelasan: "Diletakkan setelah angka atau jumlah waktu.",
  contoh: [{
    jp: "じゅっぷん ぐらい かかります。",
    romaji: "Juppun gurai kakarimasu.",
    id: "Butuh sekitar 10 menit."
  }]
}), "なにも・だれも＋ひていけい", {
  arti: "Menyatakan 'tidak satupun/tidak seorangpun' — selalu diikuti bentuk negatif.",
  penjelasan: "何も／誰も + kata kerja bentuk negatif.",
  contoh: [{
    jp: "きょうしつに だれも いません。",
    romaji: "Kyoushitsu ni dare mo imasen.",
    id: "Tidak ada seorang pun di kelas."
  }]
}), "〜は〜が（にじゅうしゅご）", {
  arti: "Pola dua subjek — menyatakan bagian/kondisi dari topik utama.",
  penjelasan: "Topik dengan は, lalu bagian spesifik dengan が.",
  contoh: [{
    jp: "わたしは あたまが いたいです。",
    romaji: "Watashi wa atama ga itai desu.",
    id: "Kepala saya sakit."
  }]
}), "じょすうし（つ・にん・まい・ほん・さつ）", {
  arti: "Sistem penghitung (counter) — kata bantu bilangan berbeda untuk jenis benda berbeda.",
  penjelasan: "つ=benda umum, 人=orang, 枚=benda tipis/pipih, 本=benda panjang, 冊=buku.",
  contoh: [{
    jp: "りんごを みっつ ください。",
    romaji: "Ringo o mittsu kudasai.",
    id: "Tolong berikan 3 buah apel."
  }, {
    jp: "がくせいが ごにん います。",
    romaji: "Gakusei ga gonin imasu.",
    id: "Ada 5 orang murid."
  }]
}), "〜という", {
  arti: "Menyatakan 'yang disebut/bernama ~', memperkenalkan istilah atau nama.",
  penjelasan: "Diletakkan setelah nama/istilah + という + kata benda.",
  contoh: [{
    jp: "たなかという ひとを しっていますか。",
    romaji: "Tanaka to iu hito o shitteimasu ka.",
    id: "Apakah kamu kenal orang bernama Tanaka?"
  }]
}), "〜そうです（ようす）", {
  arti: "Menyatakan kesan visual — 'kelihatannya/sepertinya' berdasarkan yang dilihat.",
  penjelasan: "Kata sifat -i (buang い) atau kata sifat -na + そうです.",
  contoh: [{
    jp: "この ケーキは おいしそうです。",
    romaji: "Kono keeki wa oishisou desu.",
    id: "Kue ini kelihatannya enak."
  }]
}), "じかんの いいかた（〜じ〜ふん）", {
  arti: "Cara menyatakan waktu — jam dan menit.",
  penjelasan: "Angka + じ (jam), angka + ふん/ぷん (menit).",
  contoh: [{
    jp: "いま、さんじ はんです。",
    romaji: "Ima, sanji han desu.",
    id: "Sekarang jam setengah 4 (jam 3 lewat 30 menit)."
  }]
}), "〜も", {
  arti: "Menyatakan 'juga' — dipakai menggantikan partikel は/が/を saat suatu hal berlaku sama.",
  penjelasan: "Diletakkan setelah kata benda untuk menunjukkan kesamaan dengan hal yang disebut sebelumnya.",
  contoh: [{
    jp: "わたしも がくせいです。",
    romaji: "Watashi mo gakusei desu.",
    id: "Saya juga murid."
  }]
}), "〜だけ", {
  arti: "Menyatakan 'hanya/cuma' — membatasi jumlah atau cakupan sesuatu.",
  penjelasan: "Diletakkan setelah kata benda atau jumlah untuk menunjukkan batasan.",
  contoh: [{
    jp: "これだけ ください。",
    romaji: "Kore dake kudasai.",
    id: "Tolong berikan hanya ini."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜とき", {
  arti: "Menyatakan 'saat/ketika' sesuatu terjadi.",
  penjelasan: "Diletakkan setelah kata kerja/kata sifat untuk menunjukkan waktu terjadinya suatu hal.",
  contoh: [{
    jp: "ひまなとき、ほんを よみます。",
    romaji: "Hima na toki, hon o yomimasu.",
    id: "Saat senggang, saya membaca buku."
  }]
}), "〜てから", {
  arti: "Menyatakan urutan: melakukan sesuatu setelah hal lain selesai.",
  penjelasan: "Kata kerja diubah ke bentuk -te lalu ditambah から.",
  contoh: [{
    jp: "ごはんを たべてから、でかけます。",
    romaji: "Gohan o tabete kara, dekakemasu.",
    id: "Setelah makan, saya pergi keluar."
  }]
}), "〜まえに", {
  arti: "Menyatakan 'sebelum' melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk kamus + まえに.",
  contoh: [{
    jp: "ねるまえに、はを みがきます。",
    romaji: "Neru mae ni, ha o migakimasu.",
    id: "Sebelum tidur, saya menggosok gigi."
  }]
}), "〜ている", {
  arti: "Menyatakan tindakan yang sedang berlangsung, atau keadaan yang berlaku terus.",
  penjelasan: "Kata kerja bentuk -te + いる.",
  contoh: [{
    jp: "いま、ほんを よんでいます。",
    romaji: "Ima, hon o yondeimasu.",
    id: "Sekarang, saya sedang membaca buku."
  }]
}), "〜なければなりません", {
  arti: "Menyatakan keharusan/kewajiban melakukan sesuatu.",
  penjelasan: "Bentuk negatif kata kerja (nai-form) diubah akhirannya menjadi 〜なければなりません.",
  contoh: [{
    jp: "あした、はやく おきなければなりません。",
    romaji: "Ashita, hayaku okinakereba narimasen.",
    id: "Besok, saya harus bangun pagi-pagi."
  }]
}), "〜ないといけない", {
  arti: "Sama seperti なければなりません, menyatakan keharusan, tapi lebih santai/lisan.",
  penjelasan: "Bentuk negatif kata kerja + ないと いけない.",
  contoh: [{
    jp: "やくそくを まもらないと いけません。",
    romaji: "Yakusoku o mamoranai to ikemasen.",
    id: "Saya harus menepati janji."
  }]
}), "〜てはいけません", {
  arti: "Menyatakan larangan — tidak boleh melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -te + はいけません.",
  contoh: [{
    jp: "ここで たばこを すってはいけません。",
    romaji: "Koko de tabako o sutte wa ikemasen.",
    id: "Di sini dilarang merokok."
  }]
}), "〜なくてもいいです", {
  arti: "Menyatakan bahwa sesuatu tidak wajib/tidak perlu dilakukan.",
  penjelasan: "Bentuk negatif kata kerja + くても いいです.",
  contoh: [{
    jp: "あした こなくてもいいです。",
    romaji: "Ashita konakute mo ii desu.",
    id: "Besok tidak perlu datang."
  }]
}), "〜ので", {
  arti: "Menyatakan sebab/alasan secara halus dan sopan.",
  penjelasan: "Diletakkan setelah kata kerja/kata sifat untuk menjelaskan alasan.",
  contoh: [{
    jp: "あめが ふっているので、いえに います。",
    romaji: "Ame ga futteiru node, ie ni imasu.",
    id: "Karena sedang hujan, saya di rumah."
  }]
}), "〜がほしいです", {
  arti: "Menyatakan keinginan untuk memiliki sesuatu (benda) — beda dengan たい yang untuk tindakan.",
  penjelasan: "Diletakkan setelah kata benda + が ほしいです.",
  contoh: [{
    jp: "あたらしい くつが ほしいです。",
    romaji: "Atarashii kutsu ga hoshii desu.",
    id: "Saya ingin sepatu baru."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜と同じ", {
  arti: "Menyatakan kesamaan antara dua hal.",
  penjelasan: "Diletakkan setelah kata benda + と おなじ.",
  contoh: [{
    jp: "わたしのと おなじ かばんですね。",
    romaji: "Watashi no to onaji kaban desu ne.",
    id: "Tasnya sama seperti punya saya, ya."
  }]
}), "〜たり〜たりします", {
  arti: "Menyebutkan beberapa contoh tindakan yang dilakukan (tidak berurutan pasti).",
  penjelasan: "Kata kerja bentuk -ta + り, diulang untuk tiap tindakan, diakhiri します.",
  contoh: [{
    jp: "しゅうまつは ほんを よんだり、えいがを みたりします。",
    romaji: "Shuumatsu wa hon o yondari, eiga o mitari shimasu.",
    id: "Di akhir pekan, saya membaca buku, menonton film, dan sebagainya."
  }]
}), "〜と言います", {
  arti: "Menyatakan sesuatu 'disebut sebagai' atau mengutip perkataan.",
  penjelasan: "Diletakkan setelah kata/kalimat + と いいます.",
  contoh: [{
    jp: "これは にほんごで「ねこ」と いいます。",
    romaji: "Kore wa nihongo de \"neko\" to iimasu.",
    id: "Ini dalam bahasa Jepang disebut 'neko' (kucing)."
  }]
}), "〜と思います", {
  arti: "Menyatakan pendapat/perkiraan pribadi.",
  penjelasan: "Diletakkan di akhir kalimat pendapat + と おもいます.",
  contoh: [{
    jp: "あした あめが ふると おもいます。",
    romaji: "Ashita ame ga furu to omoimasu.",
    id: "Saya pikir besok akan hujan."
  }]
}), "〜たことがあります", {
  arti: "Menyatakan pengalaman pernah melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk -ta + ことが あります.",
  contoh: [{
    jp: "にほんに いったことが あります。",
    romaji: "Nihon ni itta koto ga arimasu.",
    id: "Saya pernah pergi ke Jepang."
  }]
}), "まだ〜ていません", {
  arti: "Menyatakan sesuatu belum dilakukan/belum terjadi.",
  penjelasan: "まだ di awal kalimat, kata kerja bentuk -te + いません di akhir.",
  contoh: [{
    jp: "まだ しゅくだいを していません。",
    romaji: "Mada shukudai o shiteimasen.",
    id: "Saya belum mengerjakan PR."
  }]
}), "〜になります", {
  arti: "Menyatakan perubahan keadaan menjadi sesuatu.",
  penjelasan: "Kata benda/kata sifat -na + に なります, kata sifat -i diubah ke bentuk く + なります.",
  contoh: [{
    jp: "はるに なりました。",
    romaji: "Haru ni narimashita.",
    id: "Sudah menjadi musim semi."
  }]
}), "〜ましょうか", {
  arti: "Menawarkan bantuan atau mengajak dengan sopan.",
  penjelasan: "Kata kerja bentuk -masu diubah akhirannya jadi ましょうか.",
  contoh: [{
    jp: "にもつを もちましょうか。",
    romaji: "Nimotsu o mochimashou ka.",
    id: "Bagaimana kalau saya bawakan barangnya?"
  }]
}), "〜でしょう", {
  arti: "Menyatakan dugaan atau kemungkinan, tidak sepenuhnya pasti.",
  penjelasan: "Diletakkan di akhir kalimat menggantikan です.",
  contoh: [{
    jp: "あした あめでしょう。",
    romaji: "Ashita ame deshou.",
    id: "Besok mungkin hujan."
  }]
}), "〜んです", {
  arti: "Memberi penekanan atau penjelasan tambahan atas suatu situasi.",
  penjelasan: "Ditambahkan di akhir kalimat untuk memberi nuansa 'penjelasan'.",
  contoh: [{
    jp: "どうして おくれたんですか。",
    romaji: "Doushite okuretan desu ka.",
    id: "Kenapa kamu terlambat? (minta penjelasan)"
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "い-けいようし の かこけい・ひていけい", {
  arti: "Cara mengubah kata sifat -i ke bentuk lampau dan negatif.",
  penjelasan: "Lampau: い→かった. Negatif: い→くない. Lampau-negatif: くなかった.",
  contoh: [{
    jp: "きのうは あつかったです。",
    romaji: "Kinou wa atsukatta desu.",
    id: "Kemarin cuacanya panas."
  }, {
    jp: "きょうは あつくないです。",
    romaji: "Kyou wa atsukunai desu.",
    id: "Hari ini tidak panas."
  }]
}), "な-けいようし の かこけい・ひていけい", {
  arti: "Cara mengubah kata sifat -na ke bentuk lampau dan negatif.",
  penjelasan: "Lampau: な→だった/でした. Negatif: な→じゃない/では ありません.",
  contoh: [{
    jp: "きのうは ひまでした。",
    romaji: "Kinou wa hima deshita.",
    id: "Kemarin saya senggang."
  }, {
    jp: "にぎやかじゃ ないです。",
    romaji: "Nigiyaka ja nai desu.",
    id: "Tidak ramai."
  }]
}), "〜は〜です", {
  arti: "X adalah Y — pola paling dasar untuk menyatakan/mendeskripsikan sesuatu.",
  penjelasan: "「は」menandai topik kalimat, 「です」adalah bentuk sopan dari 'adalah'. Dipakai untuk memperkenalkan diri, menyebutkan pekerjaan, sifat, dsb.",
  contoh: [{
    jp: "わたしは がくせい です。",
    romaji: "Watashi wa gakusei desu.",
    id: "Saya adalah mahasiswa."
  }, {
    jp: "これは ほん です。",
    romaji: "Kore wa hon desu.",
    id: "Ini adalah buku."
  }]
}), "〜を〜ます", {
  arti: "Melakukan sesuatu terhadap objek — pola dasar kalimat aktif dengan objek.",
  penjelasan: "「を」menandai objek yang dikenai tindakan, 「ます」adalah akhiran kata kerja bentuk sopan.",
  contoh: [{
    jp: "パンを たべます。",
    romaji: "Pan o tabemasu.",
    id: "Saya makan roti."
  }, {
    jp: "ほんを よみます。",
    romaji: "Hon o yomimasu.",
    id: "Saya membaca buku."
  }]
}), "〜に行きます", {
  arti: "Pergi ke suatu tempat.",
  penjelasan: "「に」menandai tujuan/arah, 「行きます (ikimasu)」berarti 'pergi'. Bisa diganti 来ます (datang) atau 帰ります (pulang).",
  contoh: [{
    jp: "がっこうに いきます。",
    romaji: "Gakkou ni ikimasu.",
    id: "Saya pergi ke sekolah."
  }, {
    jp: "にほんに いきます。",
    romaji: "Nihon ni ikimasu.",
    id: "Saya pergi ke Jepang."
  }]
}), "〜があります・います", {
  arti: "Menyatakan keberadaan benda mati (あります) atau makhluk hidup (います).",
  penjelasan: "「が」menandai subjek yang keberadaannya dinyatakan. あります dipakai untuk benda mati/tumbuhan, います untuk orang/hewan.",
  contoh: [{
    jp: "つくえの うえに ほんが あります。",
    romaji: "Tsukue no ue ni hon ga arimasu.",
    id: "Ada buku di atas meja."
  }, {
    jp: "にわに ねこが います。",
    romaji: "Niwa ni neko ga imasu.",
    id: "Ada kucing di taman."
  }]
}), "〜は〜ではありません", {
  arti: "X bukan Y — bentuk negatif dari 〜は〜です.",
  penjelasan: "「ではありません」(atau bentuk santai 「じゃありません」) menegasikan です. Dipakai untuk menyangkal identitas/sifat.",
  contoh: [{
    jp: "わたしは せんせい では ありません。",
    romaji: "Watashi wa sensei dewa arimasen.",
    id: "Saya bukan guru."
  }, {
    jp: "これは わたしの かばん では ありません。",
    romaji: "Kore wa watashi no kaban dewa arimasen.",
    id: "Ini bukan tas saya."
  }]
}), "〜ません", {
  arti: "Bentuk negatif sopan dari kata kerja (tidak melakukan sesuatu).",
  penjelasan: "Mengganti akhiran 「ます」menjadi 「ません」untuk menyatakan negasi dalam bentuk sopan, baik untuk sekarang maupun masa depan.",
  contoh: [{
    jp: "あさ パンを たべません。",
    romaji: "Asa pan o tabemasen.",
    id: "Saya tidak makan roti di pagi hari."
  }, {
    jp: "きょうは がっこうに いきません。",
    romaji: "Kyou wa gakkou ni ikimasen.",
    id: "Hari ini saya tidak pergi ke sekolah."
  }]
}), "〜てください", {
  arti: "Meminta seseorang untuk melakukan sesuatu (tolong lakukan...).",
  penjelasan: "Kata kerja diubah ke bentuk て lalu ditambah 「ください」. Sopan, umum dipakai untuk instruksi atau permintaan.",
  contoh: [{
    jp: "ここに なまえを かいて ください。",
    romaji: "Koko ni namae o kaite kudasai.",
    id: "Tolong tulis nama di sini."
  }, {
    jp: "まって ください。",
    romaji: "Matte kudasai.",
    id: "Tolong tunggu."
  }]
}), "〜ないでください", {
  arti: "Meminta seseorang untuk TIDAK melakukan sesuatu.",
  penjelasan: "Kata kerja bentuk ない (negatif biasa) ditambah 「でください」. Dipakai untuk larangan yang sopan.",
  contoh: [{
    jp: "ここで しゃしんを とらないで ください。",
    romaji: "Koko de shashin o toranaide kudasai.",
    id: "Tolong jangan memotret di sini."
  }, {
    jp: "しんぱいしないで ください。",
    romaji: "Shinpai shinaide kudasai.",
    id: "Tolong jangan khawatir."
  }]
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_GRAMMAR_CONTENT, "〜から〜まで", {
  arti: "Dari ... sampai ... — menyatakan rentang waktu atau tempat.",
  penjelasan: "「から」menandai titik awal, 「まで」menandai titik akhir. Bisa dipakai untuk waktu maupun lokasi.",
  contoh: [{
    jp: "くじから ごじまで はたらきます。",
    romaji: "Kuji kara goji made hatarakimasu.",
    id: "Saya bekerja dari jam 9 sampai jam 5."
  }, {
    jp: "いえから えきまで あるきます。",
    romaji: "Ie kara eki made arukimasu.",
    id: "Saya berjalan kaki dari rumah sampai stasiun."
  }]
}), "〜たいです", {
  arti: "Ingin melakukan sesuatu.",
  penjelasan: "Akhiran 「ます」pada kata kerja diganti 「たいです」. Hanya dipakai untuk keinginan diri sendiri (orang pertama).",
  contoh: [{
    jp: "にほんに いきたいです。",
    romaji: "Nihon ni ikitai desu.",
    id: "Saya ingin pergi ke Jepang."
  }, {
    jp: "すしを たべたいです。",
    romaji: "Sushi o tabetai desu.",
    id: "Saya ingin makan sushi."
  }]
}), "〜ましょう", {
  arti: "Ajakan 'ayo/mari kita lakukan bersama'.",
  penjelasan: "Akhiran 「ます」diganti 「ましょう」. Lebih aktif mengajak dibanding 〜ませんか.",
  contoh: [{
    jp: "いっしょに べんきょう しましょう。",
    romaji: "Issho ni benkyou shimashou.",
    id: "Ayo belajar bersama."
  }, {
    jp: "すこし やすみましょう。",
    romaji: "Sukoshi yasumimashou.",
    id: "Mari istirahat sebentar."
  }]
}), "〜ませんか", {
  arti: "Ajakan yang lebih sopan/tidak memaksa — 'maukah kamu...?'.",
  penjelasan: "Bentuk negatif tanya dari ます, tapi fungsinya bukan menyangkal, melainkan menawarkan ajakan dengan sopan.",
  contoh: [{
    jp: "いっしょに えいがを みませんか。",
    romaji: "Issho ni eiga o mimasen ka.",
    id: "Maukah kamu nonton film bersama?"
  }, {
    jp: "おちゃを のみませんか。",
    romaji: "Ocha o nomimasen ka.",
    id: "Maukah kamu minum teh?"
  }]
}), "〜が好きです", {
  arti: "Menyatakan suka terhadap sesuatu.",
  penjelasan: "「が」menandai objek yang disukai (bukan 「を」). Untuk tidak suka pakai 嫌いです (kirai desu).",
  contoh: [{
    jp: "わたしは ねこが すきです。",
    romaji: "Watashi wa neko ga suki desu.",
    id: "Saya suka kucing."
  }, {
    jp: "おんがくが すきです。",
    romaji: "Ongaku ga suki desu.",
    id: "Saya suka musik."
  }]
}), "〜より〜のほうが", {
  arti: "Perbandingan 'X lebih ... daripada Y'.",
  penjelasan: "「AよりBのほうが」berarti B lebih (sifat tertentu) dibanding A. Urutan A dan B bisa ditukar posisi kalimatnya.",
  contoh: [{
    jp: "でんしゃより ひこうきの ほうが はやいです。",
    romaji: "Densha yori hikouki no hou ga hayai desu.",
    id: "Pesawat lebih cepat daripada kereta."
  }, {
    jp: "きょうより きのうの ほうが さむかったです。",
    romaji: "Kyou yori kinou no hou ga samukatta desu.",
    id: "Kemarin lebih dingin daripada hari ini."
  }]
}));
var PARTICLES = [{
  p: "は",
  nama: "penanda topik",
  penjelasan: "Menandai apa yang sedang dibicarakan dalam kalimat (topik). Dibaca 'wa', bukan 'ha'.",
  contoh: "わたしは がくせい です。 → Soal 'saya', (saya) adalah murid.",
  level: "n5"
}, {
  p: "が",
  nama: "penanda subjek",
  penjelasan: "Menandai subjek yang melakukan tindakan atau yang keberadaannya dinyatakan. Sering dipakai untuk info baru/penekanan.",
  contoh: "つくえの うえに ほんが あります。 → Ada BUKU di atas meja (fokus pada buku).",
  level: "n5"
}, {
  p: "を",
  nama: "penanda objek",
  penjelasan: "Menandai objek yang dikenai tindakan oleh kata kerja. Dibaca 'o', bukan 'wo'.",
  contoh: "パンを たべます。 → Makan ROTI (roti = objek yang dimakan).",
  level: "n5"
}, {
  p: "に",
  nama: "penanda arah/waktu/tempat tujuan",
  penjelasan: "Menunjukkan tujuan perpindahan, waktu terjadinya sesuatu, atau lokasi keberadaan.",
  contoh: "がっこうに いきます。 → Pergi KE sekolah.",
  level: "n5"
}, {
  p: "で",
  nama: "penanda lokasi kegiatan/alat",
  penjelasan: "Menunjukkan tempat suatu kegiatan berlangsung, atau alat/cara melakukan sesuatu.",
  contoh: "がっこうで べんきょうします。 → Belajar DI sekolah.",
  level: "n5"
}, {
  p: "の",
  nama: "penanda kepemilikan/keterangan",
  penjelasan: "Menghubungkan dua kata benda, biasanya menunjukkan kepemilikan atau penjelas (seperti 'nya' atau 'dari').",
  contoh: "わたしの ほん。 → Buku SAYA (buku milik saya).",
  level: "n5"
}, {
  p: "と",
  nama: "penanda 'dan/bersama'",
  penjelasan: "Menghubungkan kata benda (seperti 'dan'), atau menunjukkan orang yang menyertai suatu tindakan.",
  contoh: "ともだちと いきます。 → Pergi BERSAMA teman.",
  level: "n5"
}, {
  p: "も",
  nama: "penanda 'juga'",
  penjelasan: "Menggantikan は/が/を saat menyatakan hal yang sama juga berlaku. Artinya 'juga'.",
  contoh: "わたしも がくせい です。 → Saya JUGA murid.",
  level: "n5"
}, {
  p: "から",
  nama: "penanda 'dari' (asal/awal)",
  penjelasan: "Menunjukkan titik awal, baik waktu, tempat, maupun sebab.",
  contoh: "くじから べんきょうします。 → Belajar MULAI jam 9.",
  level: "n5"
}, {
  p: "まで",
  nama: "penanda 'sampai'",
  penjelasan: "Menunjukkan titik akhir, baik waktu maupun tempat. Sering dipakai berpasangan dengan から.",
  contoh: "くじから ごじまで はたらきます。 → Bekerja dari jam 9 SAMPAI jam 5.",
  level: "n5"
}, {
  p: "か",
  nama: "penanda kalimat tanya",
  penjelasan: "Diletakkan di akhir kalimat untuk membuatnya menjadi kalimat tanya, menggantikan tanda tanya.",
  contoh: "がくせい ですか。 → Apakah (kamu) murid?",
  level: "n5"
}, {
  p: "ね",
  nama: "partikel akhir 'kan/ya'",
  penjelasan: "Diletakkan di akhir kalimat untuk minta persetujuan atau menegaskan, seperti 'kan?' dalam Bahasa Indonesia.",
  contoh: "いい てんき ですね。 → Cuacanya bagus, ya?",
  level: "n5"
}, {
  p: "よ",
  nama: "partikel akhir penegas",
  penjelasan: "Diletakkan di akhir kalimat untuk memberi tahu/menegaskan sesuatu yang mungkin belum diketahui lawan bicara.",
  contoh: "あしたは やすみ ですよ。 → Besok libur, lho!",
  level: "n5"
}, {
  p: "だけ",
  nama: "penanda 'hanya'",
  penjelasan: "Membatasi sesuatu pada jumlah/cakupan tertentu saja, tanpa nuansa negatif.",
  contoh: "ひとつだけ ください。 → Tolong berikan HANYA satu.",
  level: "n4"
}, {
  p: "しか",
  nama: "penanda 'hanya' (+ negatif)",
  penjelasan: "Sama-sama berarti 'hanya', tapi kata kerja/predikat setelahnya WAJIB berbentuk negatif. Nuansanya lebih menekankan keterbatasan.",
  contoh: "せんえんしか ありません。 → Hanya punya seribu yen (tidak lebih).",
  level: "n4"
}, {
  p: "ばかり",
  nama: "penanda 'baru saja/melulu'",
  penjelasan: "Menunjukkan sesuatu yang baru saja terjadi (setelah bentuk た), atau kesan 'melulu/hanya itu saja' pada suatu hal.",
  contoh: "たべたばかりです。 → Baru saja makan.",
  level: "n4"
}, {
  p: "ぐらい・くらい",
  nama: "penanda perkiraan 'sekitar'",
  penjelasan: "Menunjukkan perkiraan jumlah, waktu, atau tingkatan (kira-kira segini/seberapa).",
  contoh: "いちじかんぐらい かかります。 → Butuh waktu SEKITAR satu jam.",
  level: "n4"
}, {
  p: "など",
  nama: "penanda 'dan lain-lain'",
  penjelasan: "Menyebutkan salah satu contoh dari beberapa hal, mirip 'dan sebagainya/dsb'.",
  contoh: "りんごや バナナなど。 → Apel, pisang, DAN LAIN-LAIN.",
  level: "n4"
}, {
  p: "のに",
  nama: "penanda 'padahal'",
  penjelasan: "Menghubungkan dua hal yang bertentangan, sering mengandung nuansa kecewa atau heran.",
  contoh: "がんばったのに、おちました。 → PADAHAL sudah berusaha, tapi gagal.",
  level: "n4"
}, {
  p: "さえ",
  nama: "penanda 'bahkan'",
  penjelasan: "Menekankan contoh ekstrem untuk menunjukkan hal lain pasti juga berlaku (mirip 'bahkan... saja').",
  contoh: "こどもさえ わかります。 → BAHKAN anak kecil saja mengerti.",
  level: "n3"
}, {
  p: "こそ",
  nama: "penanda penegas 'justru/-lah'",
  penjelasan: "Menegaskan dengan kuat bahwa hal itulah yang dimaksud, bukan yang lain.",
  contoh: "きょうこそ がんばります。 → Hari INI-lah saya akan berusaha keras.",
  level: "n3"
}, {
  p: "のみ",
  nama: "penanda 'hanya' (formal)",
  penjelasan: "Versi formal/tertulis dari だけ, sering muncul di dokumen resmi atau tulisan.",
  contoh: "かんけいしゃのみ にゅうじょうかのう。 → HANYA pihak terkait yang boleh masuk.",
  level: "n3"
}, {
  p: "にとって",
  nama: "penanda 'bagi/menurut'",
  penjelasan: "Menyatakan sudut pandang atau dampak sesuatu bagi seseorang/sesuatu.",
  contoh: "わたしにとって、かぞくが いちばん たいせつです。 → BAGI saya, keluarga adalah yang paling penting.",
  level: "n3"
}, {
  p: "に対して",
  nama: "penanda 'terhadap'",
  penjelasan: "Menunjukkan objek yang menjadi sasaran suatu sikap, tindakan, atau perbandingan.",
  contoh: "そのいけんに たいして、はんろんしました。 → Membantah pendapat itu.",
  level: "n3"
}, {
  p: "すら",
  nama: "penanda 'bahkan...pun' (formal)",
  penjelasan: "Mirip さえ tapi lebih formal/tertulis, menekankan hal ekstrem sebagai contoh.",
  contoh: "そのことは かぞくすら しらなかった。 → Bahkan keluarga pun tidak tahu soal itu.",
  level: "n2n1"
}, {
  p: "なり",
  nama: "penanda 'begitu langsung'",
  penjelasan: "Menunjukkan tindakan kedua terjadi persis setelah tindakan pertama, tanpa jeda.",
  contoh: "いえに かえるなり、ねてしまった。 → Begitu sampai rumah, langsung tidur.",
  level: "n2n1"
}, {
  p: "ゆえに",
  nama: "penanda 'oleh karena itu' (sastra)",
  penjelasan: "Ungkapan sebab-akibat bergaya sastra/formal tinggi, jarang dipakai lisan sehari-hari.",
  contoh: "しっぱいした。ゆえに、けいけんを えた。 → Gagal. Oleh karena itu, mendapat pengalaman.",
  level: "n2n1"
}, {
  p: "ならでは",
  nama: "penanda 'khas hanya'",
  penjelasan: "Menunjukkan sesuatu yang hanya mungkin/khas dari suatu tempat, orang, atau hal tertentu.",
  contoh: "にほんならではの ぶんか。 → Budaya yang KHAS Jepang (tidak ada di tempat lain).",
  level: "n2n1"
}];