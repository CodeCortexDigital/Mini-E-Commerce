const Product = require("../models/Product");

/* ---------- Create Product (Admin) ---------- */
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------- Get All Products (Public + Search/Filter/Sort) ---------- */
exports.getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      sort,
    } = req.query;

    let query = {};

    /* 🔍 Search (name, description, category) */
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    /* 🏷️ Category filter */
    if (category) {
      query.category = category;
    }

    /* 💰 Price range */
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    /* ⭐ Rating filter */
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    /* 📦 In-stock filter */
    if (inStock === "true") {
      query.stock = { $gt: 0 };
    }

    /* 🔃 Sorting */
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "rating") sortOption.rating = -1;
    if (sort === "newest") sortOption.createdAt = -1;

    const products = await Product.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------- Get Single Product ---------- */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------- Update Product (Admin) ---------- */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------- Delete Product (Admin) ---------- */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
