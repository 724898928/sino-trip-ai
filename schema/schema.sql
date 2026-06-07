-- 省份表
CREATE TABLE provinces (
  id TEXT PRIMARY KEY,
  name_zh TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE,
  description_zh TEXT,
  image_url TEXT,
  latitude REAL,
  longitude REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 景点表
CREATE TABLE attractions (
  id TEXT PRIMARY KEY,
  province_id TEXT REFERENCES provinces(id),
  name_zh TEXT,
  name_en TEXT,
  category TEXT,  -- 'nature','culture','food'
  description_zh TEXT,
  image_url TEXT,
  latitude REAL,
  longitude REAL,
  rating REAL DEFAULT 4.5
);

-- 攻略文章表
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  province_id TEXT REFERENCES provinces(id),
  title_zh TEXT,
  content_zh TEXT,
  author TEXT,
  published_at DATETIME,
  seo_keywords TEXT
);

-- AI 对话缓存
CREATE TABLE ai_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  messages TEXT,  -- JSON
  plan_result TEXT,
  created_at DATETIME
);

-- 初始化省份数据示例
INSERT INTO provinces VALUES
('yn','云南','Yunnan','yunnan','彩云之南，旅游天堂','https://images.unsplash.com/...',25.04,102.7),
('sc','四川','Sichuan','sichuan','天府之国，熊猫故乡','https://images.unsplash.com/...',30.57,104.06);