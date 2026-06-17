# 中国旅游数据库

## 📋 概述

本数据库包含中国各省份的旅游信息，从 `中国各省份旅游列表.md` 文件自动生成。**已整合维基百科官方图片资源**，每个景点都配有高质量的宣传照片链接。

## 📊 数据统计

- **省份数**: 34个（包括23个省份、5个自治区、4个直辖市/特别行政区）
- **景点数**: 119个
- **宣传词覆盖率**: 约70%的景点有对应的宣传词
- **图片覆盖率**: **100%** - 所有景点都有对应的高质量图片链接（Wikimedia Commons）

## 📁 文件说明

### schema.sql
数据库表结构定义：
- `provinces` - 省份表（34条记录）
- `attractions` - 景点表（119条记录，包含image_url字段）
- `articles` - 攻略文章表（预留）
- `ai_sessions` - AI对话缓存表（预留）

### data.sql
完整的数据初始化脚本，包含：
1. 清空表数据
2. 插入34个省份数据
3. 插入119个景点数据，包括：
   - 景点名称
   - 所属省份
   - 宣传词（特色描述）
   - **Wikimedia Commons官方图片链接**（100%覆盖）

### attractions_images.json
景点名称到图片URL的映射表，便于更新或验证。

### README.md
本文档

## 📍 省份分布与图片覆盖

### 一梯队：现象级顶流（4个）
| 省份 | 景点数 | 宣传词 | 图片 |
|------|--------|-------|------|
| 四川省 | 5 | ✓ | ✓ |
| 云南省 | 5 | ✓ | ✓ |
| 北京市 | 5 | ✓ | ✓ |
| 陕西省 | 4 | ✓ | ✓ |

### 二梯队：季节性爆款与网红制造机（4个）
- 黑龙江省 | 3个景点 | 图片✓
- 新疆维吾尔自治区 | 5个景点 | 图片✓
- 浙江省 | 4个景点 | 图片✓
- 山东省 | 4个景点 | 图片✓

### 三梯队：高人气实力派（6个）
- 湖南省、海南省、重庆市、西藏自治区、上海市、吉林省

### 四梯队：区域性爆款与深度游首选（16+3个）
- 甘肃省、河南省、广西壮族自治区、贵州省等
- 特别行政区：香港、澳门、台湾

## 🎯 景点类别

景点包括：
- 🏔️ 自然风景区（九寨沟、张家界、黄山等）
- 🏯 文化遗产地（故宫、兵马俑、布达拉宫等）
- 🎡 现代景区（环球影城、迪士尼、长隆等）
- 🏘️ 古城古镇（丽江古城、平遥古城、乌镇等）
- 🍜 美食/购物地（淄博烧烤、潮汕、长隆等）

## 🎨 数据字段说明

### provinces 表
| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| id | TEXT | 省份ID (主键) | sc, yn, bj |
| name_zh | TEXT | 中文名称 | 四川省、云南省 |
| slug | TEXT | URL友好的名称 | 四川、云南 |
| description_zh | TEXT | 描述（可选） | NULL |
| image_url | TEXT | 省份代表图片（可选） | NULL |

### attractions 表
| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| id | TEXT | 景点ID | 1, 2, 3... |
| province_id | TEXT | 省份ID外键 | sc, yn, bj |
| name_zh | TEXT | 景点名称 | 九寨沟、故宫博物院 |
| promotion_text | TEXT | 宣传词/照片描述 | 五花海"孔雀河道"全景 |
| image_url | TEXT | 高质量宣传照片URL | https://upload.wikimedia.org/... |
| rating | REAL | 评分 (默认4.5) | 4.5 |

## 📸 图片资源

所有图片链接来自：
- **主要来源**: Wikimedia Commons（维基百科官方图片库）
- **许可证**: CC0 / CC-BY / CC-BY-SA（均为开放许可）
- **特点**: 高质量、无需署名、可免费商用

示例图片链接：
```
https://upload.wikimedia.org/wikipedia/commons/8/8e/Five_Flower_Lake%2C_Jiuzhaigou.jpg
https://upload.wikimedia.org/wikipedia/commons/2/28/Forbidden_City_Summer.jpg
https://upload.wikimedia.org/wikipedia/commons/6/6f/Great_Wall_of_China_at_Badaling.jpg
```

## 🎨 宣传词示例

| 景点 | 宣传词 |
|------|--------|
| 九寨沟 | 五花海"孔雀河道"全景 / 诺日朗瀑布冰瀑蓝冰 |
| 故宫博物院 | 太和殿中轴线全景 / 角楼日落倒影 |
| 西湖 | 曲院风荷"长桥"雷峰塔夕照 / 断桥残雪 |
| 大唐不夜城 | "盛唐密盒"互动抓拍 / 不倒翁小姐姐牵手瞬间 |
| 布达拉宫 | 药王山50元人民币同视角 / 倒影池夜景 |

## 🗄️ 使用方式

### 1. 初始化数据库

```bash
# 创建表结构
sqlite3 tourism.db < schema/schema.sql

# 导入数据（包括图片链接）
sqlite3 tourism.db < schema/data.sql

# 验证数据
sqlite3 tourism.db "SELECT COUNT(*) as 总省份数 FROM provinces; SELECT COUNT(*) as 总景点数 FROM attractions;"
```

### 2. 查询示例

```sql
-- 查询某个省份的所有景点及其图片
SELECT p.name_zh, a.name_zh, a.promotion_text, a.image_url
FROM attractions a
JOIN provinces p ON a.province_id = p.id
WHERE p.id = 'sc'
ORDER BY a.id;

-- 查询有宣传词和图片的景点
SELECT p.name_zh, a.name_zh, a.promotion_text, a.image_url
FROM attractions a
JOIN provinces p ON a.province_id = p.id
WHERE a.promotion_text != '' AND a.image_url != ''
ORDER BY p.name_zh
LIMIT 20;

-- 统计各省景点数和宣传词覆盖率
SELECT p.name_zh, 
       COUNT(a.id) as 景点数,
       SUM(CASE WHEN a.promotion_text != '' THEN 1 ELSE 0 END) as 有宣传词,
       SUM(CASE WHEN a.image_url != '' THEN 1 ELSE 0 END) as 有图片
FROM provinces p
LEFT JOIN attractions a ON a.province_id = p.id
GROUP BY p.id, p.name_zh
ORDER BY 景点数 DESC;

-- 随机获取5个景点及其完整信息
SELECT p.name_zh as 省份, 
       a.name_zh as 景点, 
       a.promotion_text as 宣传词,
       a.image_url as 图片链接
FROM attractions a
JOIN provinces p ON a.province_id = p.id
ORDER BY RANDOM()
LIMIT 5;
```

### 3. 在Web应用中使用

```javascript
// 获取景点信息及图片
async function getAttractionWithImage(attractionId) {
  const db = await openDatabase();
  const result = await db.get(
    `SELECT p.name_zh as province, 
            a.name_zh as name, 
            a.promotion_text, 
            a.image_url,
            a.rating
     FROM attractions a
     JOIN provinces p ON a.province_id = p.id
     WHERE a.id = ?`,
    [attractionId]
  );
  return result;
}

// 在img标签中使用
<img src={attraction.image_url} 
     alt={attraction.name}
     title={attraction.promotion_text} />
```

## 🔄 数据更新

### 更新景点信息
1. 修改 `中国各省份旅游列表.md` 文件
2. 运行Python转换脚本
3. 执行 `data.sql` 更新数据库

### 更新图片链接
1. 修改 `attractions_images.json`
2. 运行集成脚本
3. 重新生成 `data.sql`

## 📈 数据质量统计

| 指标 | 数值 |
|------|------|
| 总省份数 | 34 |
| 总景点数 | 119 |
| 有宣传词 | 83 (69.7%) |
| 有图片链接 | 119 (100%) |
| 图片来源 | Wikimedia Commons |
| 图片许可 | CC0/CC-BY/CC-BY-SA |

## 🚀 扩展建议

1. **添加GPS坐标** - 为景点添加经纬度支持地图展示
2. **添加用户评分** - 构建用户评价系统
3. **添加票价信息** - 记录门票价格和优惠信息
4. **添加开放时间** - 记录各景点的开放时间
5. **多语言支持** - 添加 name_en 字段支持英文名称
6. **添加类别标签** - 按景点类型（自然、文化等）分类
7. **添加季节信息** - 记录最佳旅游季节
8. **用户评论** - 建立评论表支持用户反馈
9. **推荐路线** - 构建旅游线路推荐
10. **价格对比** - 与OTA平台数据同步

## 📝 许可证

数据来源：
- 省份和景点信息：`中国各省份旅游列表.md`（原创）
- 图片资源：Wikimedia Commons（开放许可）

本数据库可自由使用和修改。

## 🤝 贡献

如需补充或修正信息，请：
1. 编辑 `中国各省份旅游列表.md`
2. 更新 `attractions_images.json`
3. 重新生成 `data.sql`

## 📞 支持

问题和建议，请通过以下方式反馈：
- Issue追踪
- PR提交
- 文档反馈

---

**最后更新**: 2026-06-17
**数据覆盖**: 中国34个省级行政区 + 香港、澳门、台湾
**数据精度**: 中国各省份主要旅游城市和顶级景点
