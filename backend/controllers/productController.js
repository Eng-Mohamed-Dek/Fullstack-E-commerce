import productSchema from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const products = await productSchema.find({})
    const { name, description, price, productAvalibitiy } = req.body;

    // Validate inputs
    if (!name || !description || !price || !productAvalibitiy) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Validate image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required"
      });
    }

    const image = req.file.path;

    const product = await productSchema.create({
      id: products.length + 1,
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      productAvalibitiy,
      image
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const getProducts = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await productSchema
      .find()
      .skip(skip)
      .limit(limit)

    const total = await productSchema.countDocuments();

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, description, price, productAvalibitiy } = req.body;

    const product = await productSchema.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (name) product.name = name.trim();
    if (description) product.description = description.trim();
    if (price) product.price = price;
    if (productAvalibitiy) product.productAvalibitiy = productAvalibitiy;

    if (req.file) {
      product.image = req.file.path;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await productSchema.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};