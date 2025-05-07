class Product {
  final String id;
  final String name;
  final String sku;
  final String category;
  final String subcategory;
  final String description;
  final double price;
  final double taxRate;
  final int stock;
  final String unit;
  final String packaging;
  final int reorderLevel;

  Product({
    required this.id,
    required this.name,
    required this.sku,
    required this.category,
    required this.subcategory,
    required this.description,
    required this.price,
    required this.taxRate,
    required this.stock,
    required this.unit,
    required this.packaging,
    required this.reorderLevel,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      sku: json['sku'],
      category: json['category'],
      subcategory: json['subcategory'],
      description: json['description'],
      price: json['price'].toDouble(),
      taxRate: json['tax_rate'].toDouble(),
      stock: json['stock'][0]['quantity'], // Stock quantity from warehouse data
      unit: json['unit'],
      packaging: json['packaging'],
      reorderLevel: json['reorder_level'],
    );
  }
}