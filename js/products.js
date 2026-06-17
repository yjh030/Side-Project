const products = [
  {
    id: "men_canvas_classic",
    name: "極簡經典男款帆布鞋",
    englishName: "SoleStride Classic Men's Canvas",
    price: 1980,
    originalPrice: 2580,
    gender: "men",
    style: "canvas",
    image: "images/men_canvas_classic.png",
    rating: 4.8,
    reviews: 124,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: "極簡白", hex: "#ffffff" },
      { name: "經典黑", hex: "#1e293b" }
    ],
    features: ["透氣高磅數帆布", "防滑耐磨橡膠大底", "高彈性緩震鞋墊"],
    description: "承襲經典復古版型，精選高磅數透氣棉質帆布，搭配加厚彈性乳膠鞋墊，為您的日常步行提供極致舒適。防滑橡膠大底採用雙重防滑紋路，不論晴雨皆能穩定邁步。這款經典帆布鞋是每位紳士衣櫥中不可或缺的百搭單品。"
  },
  {
    id: "men_retro_jogger",
    name: "復古潮流慢跑鞋",
    englishName: "SoleStride Retro Jogger",
    price: 2880,
    originalPrice: 3680,
    gender: "men",
    style: "canvas",
    image: "images/men_retro_jogger.png",
    rating: 4.9,
    reviews: 98,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: "海軍藍/米褐", hex: "#1e3a8a" },
      { name: "經典黑", hex: "#0f172a" }
    ],
    features: ["復古拼色絨面革", "高彈力EVA減震中底", "耐磨橡膠鬆餅大底"],
    description: "結合70年代經典慢跑鞋輪廓與現代緩震科技。鞋面採用透氣網布與質感絨面革（麂皮）異材質拼接，展現層次豐富的復古潮流感。EVA輕量中底提供極佳的反饋與支撐，帶給您一整天輕盈的行走體驗。"
  },
  {
    id: "men_suede_loafer",
    name: "英倫紳士麂皮樂福鞋",
    englishName: "SoleStride Suede Loafer",
    price: 3280,
    originalPrice: 4200,
    gender: "men",
    style: "casual",
    image: "images/men_suede_loafer.png",
    rating: 4.7,
    reviews: 85,
    sizes: [39, 40, 41, 42, 43, 44],
    colors: [
      { name: "深邃棕", hex: "#78350f" },
      { name: "紳士灰", hex: "#475569" }
    ],
    features: ["進口頂級麂皮絨", "全真皮內裡與鞋墊", "手作防滑生膠底"],
    description: "精選進口柔軟麂皮，經防水防塵工藝處理，質感細緻。鞋內採用全真皮包覆，吸濕透氣不悶熱。無鞋帶的一腳蹬設計，兼具商務正裝的優雅與日常休閒的愜意，完美詮釋英倫雅痞風格。"
  },
  {
    id: "men_leather_derby",
    name: "商務休閒牛皮德比鞋",
    englishName: "SoleStride Leather Derby",
    price: 3880,
    originalPrice: 4980,
    gender: "men",
    style: "casual",
    image: "images/men_leather_derby.png",
    rating: 4.9,
    reviews: 112,
    sizes: [39, 40, 41, 42, 43, 44],
    colors: [
      { name: "曜石黑", hex: "#000000" },
      { name: "焦糖棕", hex: "#9a3412" }
    ],
    features: ["頭層擦色牛皮", "經典德比開放式襟片", "輕量防滑橡膠發泡底"],
    description: "精選優質頭層牛皮，經職人手工擦色拋光，呈現優雅的漸層光澤。開放式襟片設計適合各種腳背高度，穿著更舒適。輕量化發泡大底減輕傳統皮鞋的笨重感，是商務出差與日常通勤的完美選擇。"
  },
  {
    id: "men_hightop_sneaker",
    name: "街頭高筒潮流板鞋",
    englishName: "SoleStride Street High-Top",
    price: 2480,
    originalPrice: 3280,
    gender: "men",
    style: "canvas",
    image: "images/men_hightop_sneaker.png",
    rating: 4.6,
    reviews: 142,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: "暗夜黑", hex: "#111827" },
      { name: "原色白", hex: "#f3f4f6" }
    ],
    features: ["腳踝加厚防護填充", "高質感耐磨帆布與皮革拼接", "耐磨抓地力大底"],
    description: "注入濃烈街頭塗鴉與滑板文化靈感，高筒剪裁給予腳踝溫柔包覆與防護。局部牛皮拼接提升耐用度與視覺質感。無論搭配縮口褲或寬褲，皆能展現強烈的個人街頭潮流氣場。"
  },
  {
    id: "men_slipon_shoe",
    name: "輕量透氣休閒懶人鞋",
    englishName: "SoleStride Breathable Slip-On",
    price: 1680,
    originalPrice: 2280,
    gender: "men",
    style: "casual",
    image: "images/men_slipon_shoe.png",
    rating: 4.8,
    reviews: 204,
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: "亞麻灰", hex: "#94a3b8" },
      { name: "海洋藍", hex: "#1e40af" }
    ],
    features: ["亞麻混紡透氣鞋面", "高回彈記憶海綿鞋墊", "一秒穿脫超彈性鞋口"],
    description: "專為懶人與輕旅行設計，亞麻混紡鞋面帶來絕佳的通風性與自然美感。超彈性鞋口設計，免去繫鞋帶的繁瑣，一秒穿脫。記憶海綿鞋墊貼合腳型，走再多路也輕鬆自在。"
  },
  {
    id: "women_platform_canvas",
    name: "日系厚底增高帆布鞋",
    englishName: "SoleStride Platform Women's Canvas",
    price: 2180,
    originalPrice: 2880,
    gender: "women",
    style: "canvas",
    image: "images/women_platform_canvas.png",
    rating: 4.9,
    reviews: 178,
    sizes: [35, 36, 37, 38, 39, 40],
    colors: [
      { name: "溫柔奶茶", hex: "#d7ccc8" },
      { name: "純淨白", hex: "#ffffff" }
    ],
    features: ["4.5cm 輕量增高厚底", "拉長腿部線條修飾剪裁", "親膚棉質內裡"],
    description: "席捲日韓時尚的厚底元素，4.5公分黃金厚底高度，在視覺上自然拉長雙腿比例，同時採用超輕量發泡中底，擺脫一般厚底鞋的沉重感。精緻的針織帆布紋理搭配日系文青配色，可愛度滿分。"
  },
  {
    id: "women_pastel_runner",
    name: "粉嫩馬卡龍避震跑鞋",
    englishName: "SoleStride Pastel Running Shoe",
    price: 2680,
    originalPrice: 3580,
    gender: "women",
    style: "canvas",
    image: "images/women_pastel_runner.png",
    rating: 4.8,
    reviews: 115,
    sizes: [35, 36, 37, 38, 39, 40],
    colors: [
      { name: "櫻花粉/薄荷綠", hex: "#fbcfe8" },
      { name: "香草白", hex: "#fffbeb" }
    ],
    features: ["馬卡龍粉嫩夢幻配色", "氣墊中底吸收衝擊力", "一體成型透氣編織網布"],
    description: "融合少女心馬卡龍配色與專業慢跑鞋機能。全鞋面採用無縫編織網布，貼合雙腳並保持空氣對流。後跟搭載減震氣墊，有效吸收行走與跑步時產生的衝擊力，呵護女性纖細足踝。"
  },
  {
    id: "women_pointed_flat",
    name: "優雅尖頭軟底平底鞋",
    englishName: "SoleStride Pointed Toe Flat",
    price: 1880,
    originalPrice: 2580,
    gender: "women",
    style: "casual",
    image: "images/women_pointed_flat.png",
    rating: 4.7,
    reviews: 92,
    sizes: [35, 36, 37, 38, 39, 40],
    colors: [
      { name: "知性裸粉", hex: "#f5ebe0" },
      { name: "沉穩黑", hex: "#1a1a1a" }
    ],
    features: ["符合人體工學軟皮革", "微尖頭拉長顯瘦楦頭", "可折疊超柔軟防滑底"],
    description: "極致優雅的尖頭平底鞋，專為現代都市女性打造。採用超柔軟的合成牛皮，完美包覆雙腳不磨腳。鞋底柔軟可折疊，放進包包輕鬆攜帶。無論是通勤上班還是週末約會，都是百搭之選。"
  },
  {
    id: "women_leather_mule",
    name: "法式復古真皮穆勒鞋",
    englishName: "SoleStride French Vintage Mule",
    price: 2580,
    originalPrice: 3380,
    gender: "women",
    style: "casual",
    image: "images/women_leather_mule.png",
    rating: 4.9,
    reviews: 73,
    sizes: [35, 36, 37, 38, 39, 40],
    colors: [
      { name: "經典焦糖茶", hex: "#a0522d" },
      { name: "奶油白", hex: "#faf0e6" }
    ],
    features: ["高級牛皮手感鞋面", "法式優雅低跟設計", "一秒穿脫時尚俐落"],
    description: "融合法式優雅復古感，微方頭與低跟剪裁展現落落大方的都市氣質。半包頭與後空穆勒鞋型，出門無須繫帶，隨性優雅。精心調製的焦糖色澤牛皮，越穿越有復古韻味。"
  },
  {
    id: "women_knit_sneaker",
    name: "輕量編織透氣運動鞋",
    englishName: "SoleStride Knit Runner",
    price: 2280,
    originalPrice: 2980,
    gender: "women",
    style: "canvas",
    image: "images/women_knit_sneaker.png",
    rating: 4.8,
    reviews: 131,
    sizes: [35, 36, 37, 38, 39, 40, 41],
    colors: [
      { name: "極光灰", hex: "#cbd5e1" },
      { name: "蜜桃粉", hex: "#fecdd3" }
    ],
    features: ["立體飛織超輕鞋面", "高回彈乳膠減震鞋墊", "防滑耐磨輕量底"],
    description: "整雙鞋僅約180克！立體飛織技術織造，像穿襪子般舒適服貼且高度透氣。鞋墊採用三點防震科技，給予足弓最踏實的支撐，釋放一整天的足部疲勞。適合瑜伽、慢跑與輕度健身。"
  },
  {
    id: "women_maryjane_flat",
    name: "文藝復古瑪莉珍鞋",
    englishName: "SoleStride Vintage Mary Jane",
    price: 2380,
    originalPrice: 3180,
    gender: "women",
    style: "casual",
    image: "images/women_maryjane_flat.png",
    rating: 4.7,
    reviews: 64,
    sizes: [35, 36, 37, 38, 39, 40],
    colors: [
      { name: "文藝漆皮黑", hex: "#0a0a0a" },
      { name: "復古酒紅", hex: "#6b1d2f" }
    ],
    features: ["經典一字扣帶設計", "光澤質感環保皮面", "防滑圓頭修飾腳型"],
    description: "承襲文藝復興的古典風格，經典的一字帶扣可以自由調整鬆緊。圓潤的楦頭給予腳趾充足的活動空間，亮面漆皮質感搭配金色扣環扣件，穿上後散發滿滿的文青藝術氣息。"
  },
  {
    id: "unisex_trail_runner",
    name: "戶外防潑水越野跑鞋",
    englishName: "SoleStride Waterproof Trail Runner",
    price: 3580,
    originalPrice: 4580,
    gender: "unisex",
    style: "canvas",
    image: "images/unisex_trail_runner.png",
    rating: 4.9,
    reviews: 156,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: "森林野綠", hex: "#2d3748" },
      { name: "山岩灰", hex: "#4a5568" }
    ],
    features: ["防潑水科技塗層面料", "Vibram等級超高抓地力大底", "抗衝擊防護鞋頭"],
    description: "為山林越野與戶外探索而生。鞋面採用高強度耐磨防潑水塗層，能有效阻擋泥水與露水。大底採用深溝齒防滑紋路，能在濕滑的石路與泥地中提供驚人的抓地力，男女合腳尺碼齊全。"
  },
  {
    id: "unisex_casual_slide",
    name: "極簡美學寬帶休閒涼鞋",
    englishName: "SoleStride Minimalist Leather Slide",
    price: 1580,
    originalPrice: 2080,
    gender: "unisex",
    style: "casual",
    image: "images/unisex_casual_slide.png",
    rating: 4.6,
    reviews: 87,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: [
      { name: "沙丘米", hex: "#d2b48c" },
      { name: "曜石黑", hex: "#1a1a1a" }
    ],
    features: ["超細纖維寬帶親膚不磨腳", "符合足弓人體工學軟墊", "耐磨橡膠防滑大底"],
    description: "極簡美學設計，寬帶造型簡約大氣。鞋床依據人體足弓曲線打造，完美貼合腳底，穿著舒適無負擔。無論是出門倒垃圾、逛街還是海灘度假，都是您最清爽率性的時尚配角。"
  },
  {
    id: "men_vintage_boot",
    name: "經典工裝復古短靴",
    englishName: "SoleStride Vintage Work Boot",
    price: 4280,
    originalPrice: 5580,
    gender: "men",
    style: "casual",
    image: "images/men_vintage_boot.png",
    rating: 4.9,
    reviews: 120,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: "經典瘋馬黃", hex: "#b45309" },
      { name: "酷玩全黑", hex: "#1e1b4b" }
    ],
    features: ["真皮瘋馬牛皮面", "Goodyear固特異沿條結構", "防滑耐磨大顆粒橡膠底"],
    description: "粗獷率性的美式工裝靴。選用頂級瘋馬牛皮，隨著穿著磨損會產生獨一無二的痕跡與光澤。固特異手工沿條結構，堅固耐磨且耐穿。高筒防護與越野大底，讓你在城市或荒野皆如履平地。"
  },
  {
    id: "women_soft_loafer",
    name: "學院風軟皮樂福鞋",
    englishName: "SoleStride Academic Soft Loafer",
    price: 2480,
    originalPrice: 3280,
    gender: "women",
    style: "casual",
    image: "images/women_soft_loafer.png",
    rating: 4.8,
    reviews: 109,
    sizes: [35, 36, 37, 38, 39, 40],
    colors: [
      { name: "優雅黑", hex: "#111827" },
      { name: "醇奶茶", hex: "#d1fae5" }
    ],
    features: ["超柔軟綿羊皮觸感", "減壓防震乳膠鞋墊", "防抓地耐磨膠底"],
    description: "經典學院風樂福鞋，採用特製綿羊皮觸感面料，觸摸即能感受驚人的柔軟度。鞋後跟做了防磨腳填充，穿著首日即感受極佳舒適。鞋面精緻的五金扣件增添亮點，展現知性復古學霸範。"
  }
];
