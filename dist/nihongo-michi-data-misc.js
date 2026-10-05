"use strict";

var LEVELS = [{
  id: "n5",
  label: "N5",
  name: "Fondasi",
  weeks: "8-10 minggu",
  tagline: "Fondasi yang bikin kamu berani ngomong Jepang pertama kali.",
  comprehension: "Modal wajib ngobrol harian — sapaan, keluarga, sampai belanja.",
  kanji: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万", "水", "火", "木", "天", "土", "北", "東", "西", "南", "左", "右", "日", "月", "花", "魚", "空", "山", "川", "雨", "本", "目", "口", "耳", "手", "足", "人", "母", "父", "女", "男", "子", "小", "中", "大", "上", "下", "何", "行", "見", "言", "語", "食", "飲", "会", "学", "休", "買", "聞", "来", "立", "生", "話", "出", "読", "入", "書", "後", "古", "高", "安", "多", "新", "少", "長", "白", "分", "時", "間", "週", "年", "今", "先", "前", "午", "半", "店", "外", "電", "道", "毎", "友", "名", "金", "円", "車", "駅", "気", "国", "社", "校"],
  vocab: ["Keluarga", "Angka", "Waktu", "Makanan", "Sekolah", "Arah", "Warna", "Cuaca & Fenomena Alam", "Transportasi & Infrastruktur", "Tempat", "Rumah & Benda", "Kata Sifat", "Kata Kerja Dasar", "Hari & Bulan", "Pakaian", "Tubuh", "Kata Tanya", "Aktivitas & Hobi", "Uang & Belanja", "Negara, Bahasa & Orang", "Lingkungan & Alam", "Pekerjaan & Profesi Dasar"],
  grammar: ["〜は〜です", "〜は〜ではありません", "〜を〜ます", "〜ません", "〜に行きます", "〜があります・います", "〜てください", "〜ないでください", "〜から〜まで", "〜たいです", "〜ましょう", "〜ませんか", "〜が好きです", "〜より〜のほうが", "〜も", "〜だけ", "〜とき", "〜てから", "〜まえに", "〜ている", "〜なければなりません", "〜ないといけない", "〜てはいけません", "〜なくてもいいです", "〜ので", "〜がほしいです", "〜と同じ", "〜たり〜たりします", "〜と言います", "〜と思います", "〜たことがあります", "まだ〜ていません", "〜になります", "〜ましょうか", "〜でしょう", "〜んです", "い-けいようし の かこけい・ひていけい", "な-けいようし の かこけい・ひていけい", "〜が", "〜で", "〜の", "〜と", "〜か（しつもんぶん）", "〜ね", "〜よ", "これ・それ・あれ・どれ", "この・その・あの・どの＋めいし", "ここ・そこ・あそこ・どこ", "〜てもいいです", "〜がいます", "でも", "そして", "それから", "〜てみます", "〜てもらいます", "〜てあげます", "〜てくれます", "〜ぐらい・くらい", "なにも・だれも＋ひていけい", "〜は〜が（にじゅうしゅご）", "じょすうし（つ・にん・まい・ほん・さつ）", "〜という", "〜そうです（ようす）", "じかんの いいかた（〜じ〜ふん）"],
  reading: ["わたしの いちにち", "ねこと ねずみ", "たんじょうびの プレゼント", "あめの ひ", "はじめての りょこう"]
}, {
  id: "n4",
  label: "N4",
  name: "Dasar",
  weeks: "10-12 minggu",
  tagline: "Naik level dari sekadar tahu jadi bisa diandalkan.",
  comprehension: "Ngerti obrolan kantor & cerita sederhana tanpa mikir keras.",
  kanji: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万", "水", "火", "木", "天", "土", "北", "東", "西", "南", "左", "右", "日", "月", "花", "魚", "空", "山", "川", "雨", "本", "目", "口", "耳", "手", "足", "人", "母", "父", "女", "男", "子", "小", "中", "大", "上", "下", "何", "行", "見", "言", "語", "食", "飲", "会", "学", "休", "買", "聞", "来", "立", "生", "話", "出", "読", "入", "書", "後", "古", "高", "安", "多", "新", "少", "長", "白", "分", "時", "間", "週", "年", "今", "先", "前", "午", "半", "店", "外", "電", "道", "毎", "友", "名", "金", "円", "車", "駅", "気", "国", "社", "校", "悪", "暗", "医", "意", "以", "引", "院", "員", "運", "英", "映", "遠", "屋", "音", "歌", "夏", "家", "画", "海", "回", "開", "界", "楽", "館", "漢", "寒", "顔", "帰", "起", "究", "急", "牛", "去", "強", "教", "京", "業", "近", "銀", "区", "計", "兄", "軽", "犬", "研", "県", "建", "験", "元", "工", "広", "考", "光", "好", "合", "黒", "菜", "作", "産", "紙", "思", "姉", "止", "市", "仕", "死", "使", "始", "試", "私", "字", "自", "事", "持", "室", "質", "写", "者", "借", "弱", "首", "主", "秋", "集", "習", "終", "住", "重", "春", "所", "暑", "場", "乗", "色", "森", "心", "親", "真", "進", "図", "青", "正", "声", "世", "赤", "夕", "切", "説", "洗", "早", "走", "送", "族", "村", "体", "太", "待", "貸", "台", "代", "題", "短", "知", "地", "池", "茶", "着", "昼", "注", "町", "鳥", "朝", "通", "弟", "低", "転", "田", "都", "度", "答", "冬", "頭", "同", "動", "堂", "働", "特", "肉", "売", "発", "飯", "病", "品", "不", "風", "服", "物", "文", "別", "勉", "便", "歩", "方", "妹", "味", "民", "明", "門", "問", "夜", "野", "薬", "有", "曜", "用", "洋", "理", "旅", "料", "力", "林"],
  vocab: ["Keluarga", "Angka", "Waktu", "Makanan", "Sekolah", "Arah", "Warna", "Cuaca & Fenomena Alam", "Transportasi & Infrastruktur", "Tempat", "Rumah & Benda", "Kata Sifat", "Kata Kerja Dasar", "Hari & Bulan", "Pakaian", "Tubuh", "Kata Tanya", "Aktivitas & Hobi", "Uang & Belanja", "Negara, Bahasa & Orang", "Lingkungan & Alam", "Pekerjaan & Profesi Dasar", "Pekerjaan & Kantor", "Kesehatan", "Perasaan & Emosi", "Teknologi & Komunikasi", "Rumah & Kehidupan Sehari-hari", "Pendidikan Lanjutan", "Kata Kerja Lanjutan", "Sifat & Kondisi Lanjutan", "Ekonomi & Bisnis", "Berita & Media", "Alam & Bencana", "Masyarakat & Hubungan Sosial", "Waktu & Rencana Lanjutan", "Belanja & Layanan Publik", "Perjalanan & Wisata Lanjutan", "Pikiran, Pendapat & Ekspresi", "Ukuran, Jumlah & Perbandingan"],
  grammar: ["〜れる・られる（うけみ）", "〜せる・させる（しえき）", "〜ば", "〜たら", "〜なら", "〜そうです（でんぶん）", "〜ようです", "〜らしいです", "〜ておく", "〜てしまう", "〜あいだ・あいだに", "〜なさい", "〜すぎる", "〜やすい・にくい", "〜かもしれません", "〜はずです", "〜のに", "〜ばかり", "〜おわる・はじめる・つづける", "〜ながら", "〜てもらいたい・ほしい", "〜ことにする", "〜ことになる", "尊敬語・謙譲語（きほん）", "〜と（しぜんなけっか）", "〜だす", "〜たばかり", "〜たところ", "〜ているところ", "〜つもりだ", "〜よてい（予定）だ", "〜ようにする", "〜ようになる", "〜ことがある", "〜ことができる", "〜し〜し", "〜てほしい", "〜において", "〜にかんして", "〜について", "〜として", "〜によって", "〜わけだ", "〜わけがない", "〜べきだ", "〜しかない", "〜たがる", "〜がる", "〜かどうか", "〜か〜か", "〜さえ", "〜だけでなく", "〜たびに", "〜せいで", "〜てはじめて", "〜くせに", "〜からといって", "〜みたいだ", "〜っぽい", "〜がち", "〜きる", "かのうけい（〜える・〜られる）", "〜ながらも", "そんけいご（どうし）", "けんじょうご（どうし）", "お＋どうし（ますけい）＋になる", "お＋どうし（ますけい）＋する", "〜ていただけますか", "〜させていただきます", "〜てくれませんか", "〜てもかまいません", "〜まま", "すうりょう＋も（きょうちょう）", "すうりょう＋しか＋ひてい", "〜にとって", "〜にちがいない", "おそらく〜だろう", "〜わりに", "〜までに"],
  reading: ["しごとの めんせつ", "ひっこし", "だいがくの りゅうがくせい", "びょういんへ いった はなし", "おんせん りょこう", "おしらせ「ごみの日が かわります」", "「にほんごがっこうでの一日」", "せつめいしょ「でんしレンジの つかいかた」", "ともだちからの メール", "きゅうじん こうこく「コンビニ アルバイト」"]
}, {
  id: "n3",
  label: "N3",
  name: "Menengah",
  weeks: "14-16 minggu",
  tagline: "Titik balik dari 'pelajar' jadi 'penikmat' bahasa Jepang.",
  comprehension: "Baca artikel & ikuti obrolan sehari-hari dengan pede.",
  kanji: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万", "水", "火", "木", "天", "土", "北", "東", "西", "南", "左", "右", "日", "月", "花", "魚", "空", "山", "川", "雨", "本", "目", "口", "耳", "手", "足", "人", "母", "父", "女", "男", "子", "小", "中", "大", "上", "下", "何", "行", "見", "言", "語", "食", "飲", "会", "学", "休", "買", "聞", "来", "立", "生", "話", "出", "読", "入", "書", "後", "古", "高", "安", "多", "新", "少", "長", "白", "分", "時", "間", "週", "年", "今", "先", "前", "午", "半", "店", "外", "電", "道", "毎", "友", "名", "金", "円", "車", "駅", "気", "国", "社", "校", "悪", "暗", "医", "意", "以", "引", "院", "員", "運", "英", "映", "遠", "屋", "音", "歌", "夏", "家", "画", "海", "回", "開", "界", "楽", "館", "漢", "寒", "顔", "帰", "起", "究", "急", "牛", "去", "強", "教", "京", "業", "近", "銀", "区", "計", "兄", "軽", "犬", "研", "県", "建", "験", "元", "工", "広", "考", "光", "好", "合", "黒", "菜", "作", "産", "紙", "思", "姉", "止", "市", "仕", "死", "使", "始", "試", "私", "字", "自", "事", "持", "室", "質", "写", "者", "借", "弱", "首", "主", "秋", "集", "習", "終", "住", "重", "春", "所", "暑", "場", "乗", "色", "森", "心", "親", "真", "進", "図", "青", "正", "声", "世", "赤", "夕", "切", "説", "洗", "早", "走", "送", "族", "村", "体", "太", "待", "貸", "台", "代", "題", "短", "知", "地", "池", "茶", "着", "昼", "注", "町", "鳥", "朝", "通", "弟", "低", "転", "田", "都", "度", "答", "冬", "頭", "同", "動", "堂", "働", "特", "肉", "売", "発", "飯", "病", "品", "不", "風", "服", "物", "文", "別", "勉", "便", "歩", "方", "妹", "味", "民", "明", "門", "問", "夜", "野", "薬", "有", "曜", "用", "洋", "理", "旅", "料", "力", "林", "政", "議", "連", "対", "部", "内", "相", "定", "選", "米", "実", "関", "決", "全", "表", "戦", "経", "最", "現", "調", "化", "当", "約", "法", "性", "的", "要", "制", "治", "務", "成", "期", "取", "和", "機", "平", "加", "受", "続", "数", "記", "初", "指", "権", "支", "点", "報", "済", "活", "原", "共", "得", "解", "交", "資", "予", "向", "際", "勝", "面", "告", "反", "判", "認", "参", "利", "組", "信", "在", "件", "側", "任", "求", "次", "昨", "論", "官", "増", "係", "感", "情", "投", "示", "変", "打", "直", "両", "式", "確", "果", "容", "必", "演", "歳", "争", "談", "能", "位", "置", "流", "格", "疑", "過", "局", "放", "常", "状", "球", "職", "与", "供", "役", "構", "割", "身", "費", "付", "由", "難", "優", "夫", "収", "断", "石", "違", "消", "神", "番", "規", "術", "備", "宅", "害", "配", "警", "育", "席", "訪", "残", "想", "助", "労", "例", "然", "限", "追", "商", "葉", "伝", "形", "景", "落", "退", "負", "渡", "失", "差", "末", "守", "若", "種", "美", "命", "福", "望", "非", "観", "察", "段", "横", "深", "申", "様", "財", "港", "識", "呼", "達", "良", "阪", "候", "程", "満", "敗", "値", "突", "路", "科", "積", "他", "処", "客", "否", "師", "登", "易", "速", "存", "飛", "殺", "号", "単", "座", "破", "除", "完", "降", "責", "捕", "危", "給", "苦", "迎", "園", "具", "辞", "因", "馬", "愛", "富", "彼", "未", "舞", "亡", "冷", "適", "婦", "寄", "込", "類", "余", "王", "返", "妻", "背", "熱", "宿", "険", "頼", "覚", "船", "途", "許", "抜", "留", "罪", "努", "精", "散", "静", "婚", "喜", "浮", "絶", "幸", "押", "倒", "等", "老", "曲", "払", "庭", "徒", "勤", "遅", "居", "雑", "招", "困", "欠", "更", "刻", "賛", "抱", "犯", "恐", "息", "戻", "願", "絵", "越", "欲", "痛", "笑", "互", "束", "似", "列", "探", "逃", "遊", "迷", "夢", "君", "閉", "緒", "折", "草", "暮", "酒", "悲", "晴", "掛", "到", "寝", "盗", "吸", "陽", "御", "歯", "忘", "雪", "吹", "娘", "誤", "慣", "礼", "窓", "昔", "貧", "怒", "泳", "祖", "杯", "疲", "皆", "鳴", "腹", "煙", "眠", "怖", "頂", "箱", "晩", "髪", "忙", "才", "靴", "恥", "偶", "偉", "猫", "幾", "誰", "億", "兆", "契", "環", "境", "郊", "拡", "張", "障", "壁", "階", "悩", "恋", "慰", "励", "奮", "闘", "劣", "秀", "則", "律", "義", "偽", "欺", "奪", "略", "侵", "罰", "刑", "訴", "弁", "護", "憲", "令", "禁", "郷", "湖", "岸", "燃", "焼"],
  vocab: ["Keluarga", "Angka", "Waktu", "Makanan", "Sekolah", "Arah", "Warna", "Cuaca & Fenomena Alam", "Transportasi & Infrastruktur", "Tempat", "Rumah & Benda", "Kata Sifat", "Kata Kerja Dasar", "Hari & Bulan", "Pakaian", "Tubuh", "Kata Tanya", "Aktivitas & Hobi", "Uang & Belanja", "Negara, Bahasa & Orang", "Lingkungan & Alam", "Pekerjaan & Profesi Dasar", "Pekerjaan & Kantor", "Kesehatan", "Perasaan & Emosi", "Teknologi & Komunikasi", "Rumah & Kehidupan Sehari-hari", "Pendidikan Lanjutan", "Kata Kerja Lanjutan", "Sifat & Kondisi Lanjutan", "Ekonomi & Bisnis", "Berita & Media", "Alam & Bencana", "Masyarakat & Hubungan Sosial", "Waktu & Rencana Lanjutan", "Belanja & Layanan Publik", "Perjalanan & Wisata Lanjutan", "Pikiran, Pendapat & Ekspresi", "Ukuran, Jumlah & Perbandingan", "Politik & Pemerintahan", "Budaya & Tradisi", "Hukum & Kriminal", "Kesehatan Mental & Fisik Lanjutan", "Pendidikan & Karir", "Hubungan Interpersonal", "Media & Hiburan", "Olahraga & Kompetisi", "Seni & Sastra", "Rumah Tangga & Masyarakat Lanjutan", "Sains & Penelitian", "Teknologi Lanjutan & Internet", "Filsafat & Pemikiran", "Psikologi & Perilaku", "Geografi & Wilayah", "Sejarah & Peradaban", "Agama & Kepercayaan", "Formalitas Bisnis & Perjalanan Dinas", "Makanan & Kuliner Lanjutan", "Fashion & Penampilan", "Militer & Keamanan Nasional", "Kesehatan Masyarakat & Kedokteran", "Pertanian & Perikanan", "Industri & Manufaktur", "Perdagangan Internasional & Globalisasi", "Demografi & Kependudukan", "Etika Kerja & Profesionalisme", "Konflik & Resolusi", "Bahasa & Linguistik", "Astronomi & Fenomena Langit", "Arsitektur & Tata Kota", "Waktu Luang & Rekreasi", "Perbankan & Transaksi Sehari-hari", "Pajak & Administrasi Publik", "Energi & Sumber Daya Alam", "Surat Menyurat & Komunikasi Formal", "Pernikahan & Upacara Keluarga", "Duka & Pemakaman", "Perumahan & Sewa", "Ketertiban Umum & Lalu Lintas", "Manajemen Waktu & Produktivitas", "Restoran & Pelayanan Pelanggan", "Ilmu Sosial & Antropologi", "Kesenian Pertunjukan", "Perjalanan Luar Negeri & Imigrasi", "Manajemen Proyek & Rapat", "Sikap & Karakter Sehari-hari", "Belanja Daring & E-commerce", "Ekspresi Frekuensi & Kepastian", "Idiom & Ungkapan Sehari-hari Tambahan"],
  grammar: ["〜おかげで", "〜せいで", "〜わけではない", "〜たとたん(に)", "〜に対して", "〜において(も)", "〜に基づいて", "〜に関わらず", "〜にもかかわらず", "〜反面", "〜一方で", "〜ものの", "〜つつも", "〜くせに（かんじょうてき）", "〜あげく", "〜末に", "〜つつある", "〜ぬきで・ぬきに", "〜かねる", "〜かねない", "〜おそれがある", "〜ざるを得ない", "〜ずにはいられない", "〜てならない", "〜てしょうがない・てたまらない", "〜以上（は）", "〜上で", "〜上（に）", "〜くらいなら", "〜どころか", "〜にすぎない", "〜に決まっている", "〜に違いない", "〜んじゃないか", "〜まい", "〜べきではない", "〜てはならない", "〜ものだ（かんがい）", "〜べきだった", "〜ばよかった", "〜たらいい・たらどうですか", "〜たところで", "〜てからでないと・てからでなければ", "〜ぬく", "〜がち（ふかまり）", "〜きらいがある", "〜かのようだ", "〜まみれ", "〜だらけ", "〜気味", "〜っぱなし", "〜ぶり", "〜次第", "〜次第だ（じじょう）", "〜わりに（は）", "〜にしては", "〜にしても", "〜にしろ〜にしろ", "〜であれ", "〜くらい・ほど（ひかく）", "〜ば〜ほど", "〜つつ", "〜がてら", "〜かたわら", "〜あまり", "〜せいか", "〜ことから", "〜ものなら", "〜まじき", "〜てからというもの", "〜おりに（は）", "〜に至って", "〜を問わず", "〜をめぐって", "〜をきっかけに", "〜を通じて・を通して", "〜に伴って", "〜に応じて", "〜を中心に", "〜に加えて", "〜はもちろん"],
  reading: ["ある会社員の一日", "環境問題について考える", "駅での出来事", "手紙 ― 先生へ", "面接での失敗", "おしらせ「町内清掃活動のご案内」", "「スマートフォンとの付き合い方」", "「引っ越しの準備」", "「アルバイト先での出来事」", "「ペットを飼うということ」", "案内「スポーツジム利用案内」", "「日本の四季と行事」", "「初めての一人暮らし」", "情報「アパート情報」", "「ボランティア活動に参加して」"]
}, {
  id: "n2n1",
  label: "N2-N1",
  name: "Mahir",
  weeks: "32-40 minggu",
  tagline: "Puncak pendakian — dari mahir jadi profesional.",
  comprehension: "Level puncak — siap ujian JLPT & berkarir profesional di Jepang.",
  kanji: ["概", "念", "抽", "象", "矛", "盾", "把", "握", "陥", "繊", "仁", "企", "伸", "伴", "延", "徴", "忍", "怠", "怪", "恒", "扱", "拘", "拒", "拓", "抑", "択", "担", "拍", "拠", "括", "揮", "携", "搬", "摘", "撃", "撮", "擦", "攻", "曇", "朗", "核", "桜", "梅", "棒", "棚", "検", "欄", "浪", "浸", "湾", "滅", "漂", "濁", "灯", "焦", "煮", "煩", "爆", "猛", "獲", "玄", "瓶", "甲", "畳", "疎", "疫", "症", "癖", "盛", "盟", "盤", "瞬", "硬", "礎", "祝", "秘", "稲", "窮", "筋", "箇", "範", "簡", "籍", "紋", "紫", "紹", "絡", "継", "維", "綱", "緊", "縁", "縮", "繁", "耐", "肩", "脈", "脱", "舎", "冒", "顧", "慮", "慢", "酷", "厳", "伏", "償", "催", "傍", "傾", "僅", "儀", "凝", "凶", "剖", "剤", "劇", "勧", "勘", "卑", "却", "卓", "双", "吉", "含", "呈", "唯", "執", "妨", "妥", "姓", "孤", "孝", "寛", "寿", "屈", "岐", "岳", "峰", "崩", "巡", "帆", "帝", "幻", "床", "底", "廃", "廊", "彩", "彰", "征", "恭", "悔", "悟", "惜", "慈", "慎", "憂", "憤", "懇", "懲", "戒", "扇", "拙", "挑", "振", "捜", "掃", "授", "掌", "排", "措", "摂", "撤", "擁", "敏", "斜", "施", "旋", "旨", "旗", "昇", "替", "朱", "机", "桃", "棄", "棋", "欧", "歓", "殖", "殿", "汗", "汚", "江", "沈", "沿", "泡", "泥", "浄", "浦", "涙", "涯", "淑", "淡", "添", "渇", "渋", "渦", "湿", "溝", "溶", "滑", "滞", "漆", "漠", "漸", "潔", "潜", "澄", "濃", "瀬", "炉", "烈", "煎", "爽", "牲", "狂", "狩", "狭", "狙", "獄", "珠", "班", "琴", "瑞", "甘", "甚", "疾", "療", "癒", "監", "盲", "盆", "眺", "睡", "督", "瞳", "矯", "砕", "砲", "硫", "碑", "禍", "秒", "租", "秩", "称", "稚", "稼", "稽", "穂", "穏", "窃", "窒", "竜", "端", "笛", "筆", "箋", "篤", "簿", "籠", "粋", "粒", "粗", "粛", "粧", "糖", "紛", "紳", "絞", "緯", "縛", "繕", "躍", "軌", "軟", "轄", "遍", "遮", "還", "那", "郡", "酌", "酬", "酵", "醜", "醸", "采", "釜", "銃", "銘", "鋳", "錠", "錯", "錬", "鍛", "鎖", "鎮", "鑑", "閥", "閲", "阻", "附", "陣", "陪", "隅", "隔", "雌", "雰", "韻", "響", "頬", "顕", "飽", "飾", "餌", "駆", "騎", "魅", "魔", "鶏", "麻", "鼓", "鶴", "冠", "慶", "併", "侮", "凡", "刃", "占", "叫", "召", "吐", "吠", "咲", "唐", "嘆", "嘱", "噴", "壊", "墓", "壇", "妙", "婆", "嫌", "尽", "帽", "幅", "幹", "庁", "弓", "弦", "彫", "徐", "悦", "懐", "扉", "抄", "抹", "拳", "掘", "掲", "揚", "搭", "摩", "敢", "旦", "柄", "柔", "氏", "統", "保", "第", "結", "派", "案", "策", "基", "価", "提", "挙", "応", "藤", "沢", "裁", "証", "援", "井", "展", "態", "鮮", "視", "条", "独", "宮", "率", "衛", "審", "株", "姿", "閣", "衆", "評", "影", "松", "佐", "整", "融", "製", "票", "渉", "推", "請", "器", "士", "討", "崎", "及", "離", "激", "系", "批", "郎", "健", "従", "修", "隊", "織", "故", "就", "異", "献", "浜", "遺", "塁", "邦", "素", "遣", "抗", "模", "雄", "益", "標", "宣", "昭", "伊", "僚", "皇", "臨", "踏", "債", "興", "源", "創", "葬", "避", "司", "康", "善", "逮", "迫", "惑", "紀", "聴", "級", "博", "締", "救", "房", "削", "密", "志", "載", "我", "為", "幕", "染", "奈", "傷", "弾", "功", "塚", "致", "繰", "尾", "描", "鈴", "項", "喪", "養", "懸", "街", "邸", "属", "枠", "恵", "露", "沖", "緩", "節", "需", "射", "購", "充", "貢", "鹿", "賃", "徹", "貴", "衝", "災", "析", "譲", "納", "樹", "誘", "至", "宗", "促", "控", "智", "宙", "俊", "銭", "操", "診", "託", "誕", "謝", "透", "津", "仮", "裂", "是", "裕", "堅", "訳", "芝", "典", "賀", "弘", "看", "訟", "祉", "誉", "奏", "騒", "縄", "揺", "免", "既", "薦", "隣", "華", "隠", "徳", "哲", "杉", "釈", "己", "威", "豪", "熊", "微", "隆", "暫", "忠", "倉", "彦", "肝", "喚", "唱", "阿", "索", "誠", "襲", "俳", "驚", "李", "浩", "趣", "斎", "貫", "仙", "序", "旬", "兼", "聖", "即", "柳", "較", "覇", "詳", "抵", "脅", "茂", "犠", "距", "雅", "網", "詩", "翼", "潟", "敵", "斉", "敷", "圏", "酸", "腐", "脚", "潮", "僕", "炎", "賠", "句", "鋼", "頑", "縦", "輝", "蓄", "軸", "誇", "祥", "宏", "唆", "泰", "賄", "撲", "堀", "菊", "膨", "矢", "塾", "漏", "芳", "剣", "丁", "之", "倫", "陳", "憶", "梨", "克", "黙", "須", "偏", "遇", "諮", "亀", "糧", "牧", "殊", "艦", "輩", "穴", "奇", "謀", "暖", "昌", "覆", "胞", "泣", "没", "暇", "肺", "貞", "靖", "飼", "陰", "随", "尋", "稿", "丹", "啓", "也", "丘", "棟", "壌", "漫", "粘", "舗", "妊", "熟", "旭", "恩", "騰", "往", "豆", "遂", "陛", "培", "衰", "艇", "径", "披", "廷", "錦", "准", "磯", "奨", "剰", "胆", "駒", "虚", "霊", "帳", "諭", "惨", "虐", "翻", "墜", "沼", "据", "肥", "滝", "俵", "鯨", "荘", "諾", "雷", "栽", "拐", "駄", "鏡", "聡", "亜", "覧", "詐", "勲", "曙", "卸", "逸", "眼", "尚", "巧", "垣", "釣", "萩", "栗", "愚", "嘉", "遭", "架", "鬼", "庶", "滋", "姫", "誓", "践", "仰", "剛", "謡", "嫁", "謙", "后", "菌", "鎌", "巣", "頻", "宰", "寂", "辰", "霞", "碁", "俗", "邪", "晶", "墨", "洞", "履", "殴", "娠", "奉", "朴", "亭", "淳", "鳩", "酔", "穫", "佳", "潤", "悼", "乏", "該", "赴", "桑", "桂", "髄", "虎", "晋", "壮", "堤", "飢", "累", "痴", "晃", "桐", "寸", "郭", "尿", "宴", "鷹", "賓", "虜", "陶", "鐘", "憾", "猪", "紘", "磁", "弥", "昆", "訂", "芽", "庄", "傘", "敦", "寧", "循", "如", "寮", "祐", "鵬", "鉛", "苗", "獣", "哀", "跳", "匠", "垂", "蛇", "縫", "僧", "亘", "呉", "憩", "媛", "刈", "伯", "笹", "穀", "陵", "霧", "魂", "弊", "妃", "舶", "餓", "麗", "綾", "臭", "暦", "宜", "辱", "毅", "猿", "稔", "炊", "洪", "冗", "枢", "刀", "裸", "猶", "塊", "幣", "膜", "腸", "槽", "楊", "伐", "駿", "漬", "糾", "亮", "墳", "坪", "紺", "娯", "椿", "舌", "羅", "峡", "俸", "厘", "圭", "蓮", "弔", "乙", "汁", "尼", "衡", "薫", "猟", "羊", "款", "偵", "喝", "胎", "豚", "赦", "又", "慨", "紡", "恨", "肪", "扶", "戯", "伍", "忌", "奔", "斗", "蘭", "迅", "肖", "鉢", "朽", "殻", "享", "秦", "茅", "藩", "沙", "輔", "媒", "禅", "胴", "迭", "挿", "嵐", "椎", "絹", "譜", "郁", "悠", "暁", "傑", "楠", "玲", "奴", "翔", "遷", "侍", "尺", "峠", "肇", "叔", "亨", "堪", "叙", "酢", "吟", "逓", "嶺", "喬", "崇", "岬", "愉", "寅", "礁", "乃", "洲", "屯", "樺", "姻", "巌", "擬", "塀", "唇", "睦", "閑", "胡", "幽", "峻", "曹", "詠", "尉", "隷", "蝶", "酪", "茎", "帥", "逝", "汽", "琢", "匿", "襟", "蛍", "蕉", "寡", "琉", "痢", "庸", "朋", "坑", "藍", "賊", "搾", "畔", "遼", "唄", "孔", "橘", "漱", "呂", "拷", "嬢", "苑", "巽", "杜", "渓", "翁", "廉", "謹", "湧", "窯", "褒", "升", "殉", "巴", "禎", "劾", "堕", "稜", "桟", "倭", "婿", "慕", "斐", "罷", "某", "囚", "魁", "虹", "鴻", "泌", "於", "赳", "蚊", "葵", "厄", "藻", "禄", "孟", "嫡", "尭", "嚇", "巳", "凸", "暢", "霜", "硝", "勅", "芹", "杏", "棺", "儒", "鳳", "馨", "慧", "愁", "楼", "匡", "眉", "欽", "薪", "褐", "賜", "綜", "栓", "翠", "鮎", "凹", "艶", "渚", "衷", "逐", "斥", "稀", "詔", "雛", "惟", "耀", "憧", "宵", "妄", "甫", "蚕", "嬉", "蒼", "頒", "只", "肢", "凱", "謄", "丑", "嗣", "叶", "汐", "朔", "畝", "惰", "蛮", "旺", "萌", "壱", "瑠", "侯", "鯉", "遥", "卯", "但", "芋", "茜", "凌", "毬", "緋", "鯛", "邑", "倣", "碧", "啄", "酉", "繭", "亦", "賦", "弐", "痘", "昴", "且", "吏", "麿", "楓", "梧", "哉", "匁", "衿", "梢", "丙", "茄", "勺", "瑚", "遵", "虞", "謁", "斤", "捺", "誼", "冶", "栞", "菖", "叡", "胤", "亥", "爵", "脹", "汰", "耶", "椰", "絃", "塑", "昂", "柾", "菫", "諒", "鞠", "濫", "捷"],
  vocab: ["Kata Keterangan (Fukushi) N2", "Kata Keterangan (Fukushi) N1", "Kata Sambung & Konjungsi Formal", "Ungkapan Perbandingan & Kontras", "Ungkapan Sebab-Akibat Lanjutan", "Ungkapan Menyatakan Dugaan & Kemungkinan", "Ungkapan Permintaan & Izin Formal", "Kata Kerja Pasif & Kausatif dalam Bacaan", "Kata Sifat-na Formal N2-N1", "Kata Kerja Suru Formal N2", "Kata Kerja Suru Formal N1", "Kata Kerja Umum N2", "Kata Kerja Umum N1", "Kata Sifat Umum N2-N1", "Kata Kerja Majemuk (Fukugou Doushi) N2", "Kata Kerja Majemuk (Fukugou Doushi) N1", "Kata Sifat-i Tambahan N2-N1", "Kata Kerja Kondisi & Perubahan Keadaan", "Kata Sifat Menggambarkan Orang N2-N1", "Bisnis formal", "Akademik", "Politik", "Sastra", "Hukum Formal & Kontrak", "Ekonomi Makro", "Ilmiah & Penelitian Lanjutan", "Media Formal & Jurnalistik", "Filosofi & Pemikiran Abstrak", "Diplomasi & Hubungan Internasional Lanjutan", "Psikologi Lanjutan & Perilaku Kompleks", "Teknologi Mutakhir & AI", "Lingkungan & Perubahan Iklim Lanjutan", "Kedokteran & Ilmu Kesehatan Lanjutan", "Seni Rupa & Estetika", "Militer & Strategi Lanjutan", "Sosiologi & Struktur Masyarakat", "Linguistik Lanjutan & Semantik", "Manajemen & Kepemimpinan Lanjutan", "Antropologi & Kebudayaan Lanjutan", "Sejarah Modern & Peradaban Lanjutan", "Fisika & Astronomi Lanjutan", "Biologi & Genetika Lanjutan", "Pendidikan & Kurikulum Lanjutan", "Agrikultur & Pangan Global", "Perbankan & Pasar Modal", "Asuransi & Manajemen Risiko Finansial", "Etika Bisnis & Tanggung Jawab Sosial", "Retorika & Debat Formal", "Transportasi & Logistik Lanjutan", "Energi & Infrastruktur Lanjutan", "Perdagangan & Ritel Lanjutan", "Telekomunikasi & Jaringan", "Arsitektur & Perencanaan Kota Lanjutan", "Kimia Lanjutan & Material Sains", "Matematika Lanjutan & Statistika", "Olahraga Profesional & Manajemen Event", "Perfilman & Produksi Media", "Keamanan Siber & Privasi Data", "Keigo Bisnis & Korespondensi Formal", "Peribahasa & Yojijukugo Lanjutan", "Geologi & Ilmu Kebumian", "Oseanografi & Ilmu Kelautan", "Perdagangan Internasional & Bea Cukai", "Kuliner Profesional & Gastronomi", "Fashion & Industri Tekstil Lanjutan", "Ilmu Kedirgantaraan & Eksplorasi Luar Angkasa", "Farmasi & Bioteknologi Lanjutan", "Sosiologi Perkotaan & Demografi Lanjutan", "Akuntansi & Perpajakan Lanjutan", "Manajemen Sumber Daya Manusia Lanjutan", "Ilmu Komunikasi & Public Relations", "Neurosains & Ilmu Otak", "Kriminologi & Ilmu Forensik", "Sejarah Seni & Musik Klasik", "Statistika Sosial & Survei", "Manajemen Bencana & Tanggap Darurat", "Hak Asasi Manusia & Keadilan Sosial", "Etika Teknologi & Bioetika", "Ekonomi Perilaku & Pengambilan Keputusan", "Manajemen Proyek Lanjutan", "Kata Benda Formal & Akademik Tambahan", "Keigo & Sonkeigo/Kenjougo Lanjutan", "Ungkapan Pembuka & Penutup Bisnis", "Kosakata Berita & Editorial Tambahan", "Kosakata Waktu & Perubahan Formal", "Ungkapan Formal untuk Menyatakan Pendapat", "Ungkapan Formal Menyampaikan Berita/Info", "Idiom", "Ungkapan & Ekspresi Umum N2-N1", "Kata Benda Umum di Bacaan JLPT", "Onomatope (Giongo & Gitaigo) N1", "Kanyouku (Ungkapan Tetap) Umum", "Kosakata Emosi & Sikap Tambahan", "Kata Benda Abstrak N2", "Kata Benda Abstrak N1", "Kosakata Perasaan Fisik & Kondisi Tubuh", "Kosakata Hubungan Sosial Sehari-hari", "Kata Benda Kegiatan Sehari-hari Formal", "Kosakata Deskripsi Angka & Data Lanjutan", "Ungkapan Kekecewaan & Kepuasan", "Kosakata Proses Berpikir & Analisis", "Kata Benda Sifat Karakter & Kepribadian", "JLPT N2 — Kosakata Frekuensi Tinggi", "Pasangan Kata Kerja Transitif-Intransitif Lanjutan", "Kata Benda Waktu & Periode Formal", "Ungkapan Menyatakan Tujuan", "Kata Kerja Menyatakan Awal & Akhir", "Ungkapan Menyatakan Syarat", "Kata Benda Tempat & Fasilitas Formal", "Kosakata Pekerjaan & Karir Lanjutan", "Kosakata Hasil & Pencapaian Formal", "Ungkapan Formal Menutup Pembicaraan", "Ungkapan Formal Mengajukan Usulan", "Kosakata Fenomena Alam dalam Bacaan Formal", "Kata Benda Menyatakan Metode & Cara", "Ungkapan Formal Memberikan Instruksi", "Kosakata Kepribadian Negatif & Kritik Halus", "Kata Kerja Menyatakan Usaha & Upaya", "Ungkapan Formal Menyatakan Keluhan", "Kata Benda Formal untuk Isu Sosial", "Kosakata Formal Rapat & Diskusi", "Kata Sifat Formal Menyatakan Tingkat"],
  grammar: ["〜を余儀なくされる", "〜にほかならない", "〜きらいがある", "〜べからず", "〜だに", "〜なくして（は）", "〜んがため", "〜べく", "〜いかんによらず", "〜たりとも", "〜が早いか", "〜なり", "〜が早いか、〜そばから", "〜にたえない", "〜てやまない", "〜まじき", "〜んばかりに", "〜ともなく・ともなしに", "〜うが・うと（も）", "〜う（よう）にも〜ない", "〜そびれる", "〜ずくめ", "〜めく", "〜すら", "〜こそすれ", "〜きっての", "〜ならでは", "〜たる（もの）", "〜と相まって", "〜ゆえに", "〜にとどまらず", "〜てしかるべきだ", "〜に足る", "〜極まる・極まりない", "〜んとする", "〜てはばからない", "〜をものともせず", "〜をよそに", "〜あってこそ", "〜ながらに（して）", "〜にかたくない", "〜ものを", "〜ないまでも", "〜ないものか", "〜んがための", "〜手前", "〜ずにはおかない", "〜にかこつけて", "〜すべもない", "〜と相場が決まっている", "〜始末だ", "〜には及ばない", "〜てもさしつかえない", "〜たる所以", "〜を皮切りに", "〜に足らない", "〜ともあろう", "〜ことなしに", "〜ならいざしらず", "〜と言わんばかりに", "〜であれ〜であれ", "〜と思いきや", "〜ようが〜まいが", "〜なりに", "〜ながらに", "〜たが最後", "〜には当たらない", "〜てからでは遅い", "〜と相成る", "〜と言えなくもない", "〜ただでさえ", "〜とあって", "〜と見える", "〜が最後、〜てやまない（つよめ）", "〜束の間", "〜と裏腹に", "〜てはかなわない", "〜には及ばぬまでも", "〜と目される", "〜の至り"],
  reading: ["情報化社会の光と影", "株主各位へのご報告", "競争社会に思うこと", "高齢化社会と地域コミュニティ", "ある発明家の生涯", "環境保護と経済発展のジレンマ", "採用面接を終えて", "言葉の重みについて", "終身雇用制度の行方", "ミニマリズムという生き方", "裁判員制度を考える", "伝統工芸の継承者たち", "リモートワークがもたらした変化", "芸術の価値とは何か", "少子化問題の根源を探る"]
}];
var QUIZ = [{
  q: "日 dibaca dan berarti apa?",
  options: ["hi / matahari, hari", "mizu / air", "hito / orang", "ki / pohon"],
  a: 0
}, {
  q: "Pilih partikel yang tepat: 学校___ 行きます",
  options: ["を", "は", "に", "と"],
  a: 2
}, {
  q: "「食べたことがあります」artinya?",
  options: ["sedang makan", "pernah makan", "akan makan", "ingin makan"],
  a: 1
}, {
  q: "曜 muncul dalam kata apa?",
  options: ["曜日 (hari dalam minggu)", "先生 (guru)", "天気 (cuaca)", "電車 (kereta)"],
  a: 0
}, {
  q: "「〜なければなりません」menyatakan?",
  options: ["larangan", "keharusan", "izin", "kemampuan"],
  a: 1
}];
var KANA_ROWS = [["a", "i", "u", "e", "o"], ["ka", "ki", "ku", "ke", "ko"], ["sa", "shi", "su", "se", "so"], ["ta", "chi", "tsu", "te", "to"], ["na", "ni", "nu", "ne", "no"], ["ha", "hi", "fu", "he", "ho"], ["ma", "mi", "mu", "me", "mo"], ["ya", null, "yu", null, "yo"], ["ra", "ri", "ru", "re", "ro"], ["wa", null, null, null, "wo"], ["n", null, null, null, null]];
var HIRAGANA = {
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",
  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",
  sa: "さ",
  shi: "し",
  su: "す",
  se: "せ",
  so: "そ",
  ta: "た",
  chi: "ち",
  tsu: "つ",
  te: "て",
  to: "と",
  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",
  ha: "は",
  hi: "ひ",
  fu: "ふ",
  he: "へ",
  ho: "ほ",
  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",
  ya: "や",
  yu: "ゆ",
  yo: "よ",
  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",
  wa: "わ",
  wo: "を",
  n: "ん"
};
var KATAKANA = {
  a: "ア",
  i: "イ",
  u: "ウ",
  e: "エ",
  o: "オ",
  ka: "カ",
  ki: "キ",
  ku: "ク",
  ke: "ケ",
  ko: "コ",
  sa: "サ",
  shi: "シ",
  su: "ス",
  se: "セ",
  so: "ソ",
  ta: "タ",
  chi: "チ",
  tsu: "ツ",
  te: "テ",
  to: "ト",
  na: "ナ",
  ni: "ニ",
  nu: "ヌ",
  ne: "ネ",
  no: "ノ",
  ha: "ハ",
  hi: "ヒ",
  fu: "フ",
  he: "ヘ",
  ho: "ホ",
  ma: "マ",
  mi: "ミ",
  mu: "ム",
  me: "メ",
  mo: "モ",
  ya: "ヤ",
  yu: "ユ",
  yo: "ヨ",
  ra: "ラ",
  ri: "リ",
  ru: "ル",
  re: "レ",
  ro: "ロ",
  wa: "ワ",
  wo: "ヲ",
  n: "ン"
};

// Kombinasi lanjutan: dakuten (゛), handakuten (゜), yōon (ゃゅょ), dan contoh vokal panjang.
// Entri berbentuk daftar unik (bukan map romaji->huruf) supaya bacaan yang mirip (mis. じ vs ぢ, ず vs づ) tidak bentrok.

var KANA_GROUPS = [{
  id: "dakuten",
  title: "Dakuten (゛)",
  desc: "Tanda tik dua di kanan atas mengubah bunyi jadi lebih “berat”.",
  entries: [{
    r: "ga",
    h: "が",
    k: "ガ"
  }, {
    r: "gi",
    h: "ぎ",
    k: "ギ"
  }, {
    r: "gu",
    h: "ぐ",
    k: "グ"
  }, {
    r: "ge",
    h: "げ",
    k: "ゲ"
  }, {
    r: "go",
    h: "ご",
    k: "ゴ"
  }, {
    r: "za",
    h: "ざ",
    k: "ザ"
  }, {
    r: "ji",
    h: "じ",
    k: "ジ"
  }, {
    r: "zu",
    h: "ず",
    k: "ズ"
  }, {
    r: "ze",
    h: "ぜ",
    k: "ゼ"
  }, {
    r: "zo",
    h: "ぞ",
    k: "ゾ"
  }, {
    r: "da",
    h: "だ",
    k: "ダ"
  }, {
    r: "ji (ぢ)",
    h: "ぢ",
    k: "ヂ"
  }, {
    r: "zu (づ)",
    h: "づ",
    k: "ヅ"
  }, {
    r: "de",
    h: "で",
    k: "デ"
  }, {
    r: "do",
    h: "ど",
    k: "ド"
  }, {
    r: "ba",
    h: "ば",
    k: "バ"
  }, {
    r: "bi",
    h: "び",
    k: "ビ"
  }, {
    r: "bu",
    h: "ぶ",
    k: "ブ"
  }, {
    r: "be",
    h: "べ",
    k: "ベ"
  }, {
    r: "bo",
    h: "ぼ",
    k: "ボ"
  }]
}, {
  id: "handakuten",
  title: "Handakuten (゜)",
  desc: "Tanda lingkaran kecil di kanan atas, khusus baris は → bunyi “p”.",
  entries: [{
    r: "pa",
    h: "ぱ",
    k: "パ"
  }, {
    r: "pi",
    h: "ぴ",
    k: "ピ"
  }, {
    r: "pu",
    h: "ぷ",
    k: "プ"
  }, {
    r: "pe",
    h: "ぺ",
    k: "ペ"
  }, {
    r: "po",
    h: "ぽ",
    k: "ポ"
  }]
}, {
  id: "yoon",
  title: "Yōon — kombinasi ゃゅょ",
  desc: "Huruf baris i + や/ゆ/よ kecil, dibaca menyatu jadi satu suku kata.",
  entries: [{
    r: "kya",
    h: "きゃ",
    k: "キャ"
  }, {
    r: "kyu",
    h: "きゅ",
    k: "キュ"
  }, {
    r: "kyo",
    h: "きょ",
    k: "キョ"
  }, {
    r: "sha",
    h: "しゃ",
    k: "シャ"
  }, {
    r: "shu",
    h: "しゅ",
    k: "シュ"
  }, {
    r: "sho",
    h: "しょ",
    k: "ショ"
  }, {
    r: "cha",
    h: "ちゃ",
    k: "チャ"
  }, {
    r: "chu",
    h: "ちゅ",
    k: "チュ"
  }, {
    r: "cho",
    h: "ちょ",
    k: "チョ"
  }, {
    r: "nya",
    h: "にゃ",
    k: "ニャ"
  }, {
    r: "nyu",
    h: "にゅ",
    k: "ニュ"
  }, {
    r: "nyo",
    h: "にょ",
    k: "ニョ"
  }, {
    r: "hya",
    h: "ひゃ",
    k: "ヒャ"
  }, {
    r: "hyu",
    h: "ひゅ",
    k: "ヒュ"
  }, {
    r: "hyo",
    h: "ひょ",
    k: "ヒョ"
  }, {
    r: "mya",
    h: "みゃ",
    k: "ミャ"
  }, {
    r: "myu",
    h: "みゅ",
    k: "ミュ"
  }, {
    r: "myo",
    h: "みょ",
    k: "ミョ"
  }, {
    r: "rya",
    h: "りゃ",
    k: "リャ"
  }, {
    r: "ryu",
    h: "りゅ",
    k: "リュ"
  }, {
    r: "ryo",
    h: "りょ",
    k: "リョ"
  }, {
    r: "gya",
    h: "ぎゃ",
    k: "ギャ"
  }, {
    r: "gyu",
    h: "ぎゅ",
    k: "ギュ"
  }, {
    r: "gyo",
    h: "ぎょ",
    k: "ギョ"
  }, {
    r: "ja",
    h: "じゃ",
    k: "ジャ"
  }, {
    r: "ju",
    h: "じゅ",
    k: "ジュ"
  }, {
    r: "jo",
    h: "じょ",
    k: "ジョ"
  }, {
    r: "bya",
    h: "びゃ",
    k: "ビャ"
  }, {
    r: "byu",
    h: "びゅ",
    k: "ビュ"
  }, {
    r: "byo",
    h: "びょ",
    k: "ビョ"
  }, {
    r: "pya",
    h: "ぴゃ",
    k: "ピャ"
  }, {
    r: "pyu",
    h: "ぴゅ",
    k: "ピュ"
  }, {
    r: "pyo",
    h: "ぴょ",
    k: "ピョ"
  }]
}, {
  id: "choonpu",
  title: "Vokal panjang (contoh)",
  desc: "Bunyi ditahan lebih lama: tambah vokal di hiragana, tambah ー di katakana.",
  entries: [{
    r: "chaa",
    h: "ちゃあ",
    k: "チャー"
  }, {
    r: "chuu",
    h: "ちゅう",
    k: "チュー"
  }, {
    r: "choo",
    h: "ちょう",
    k: "チョー"
  }, {
    r: "kaa",
    h: "かあ",
    k: "カー"
  }, {
    r: "kuu",
    h: "くう",
    k: "クー"
  }, {
    r: "koo",
    h: "こう",
    k: "コー"
  }, {
    r: "juu",
    h: "じゅう",
    k: "ジュー"
  }, {
    r: "gyoo",
    h: "ぎょう",
    k: "ギョー"
  }]
}];
var DAILY_TASKS = [{
  id: "d1",
  label: "Kanji",
  minutes: 5
}, {
  id: "d2",
  label: "Kosakata",
  minutes: 5
}, {
  id: "d3",
  label: "Grammar",
  minutes: 5
}, {
  id: "d5",
  label: "Review kemarin",
  minutes: 5
}];
var WEEK_DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
var TABS = [{
  id: "home",
  label: "Home",
  icon: Home,
  color: "sakura"
}, {
  id: "aksara",
  label: "Aksara",
  icon: BookOpen,
  color: "sora"
}, {
  id: "tracker",
  label: "Learning",
  icon: Book,
  color: "matcha"
}, {
  id: "rutinitas",
  label: "Tracker",
  icon: BarChart3,
  color: "yuzu"
}, {
  id: "latihan",
  label: "Latihan",
  icon: PenLine,
  color: "momiji"
}];