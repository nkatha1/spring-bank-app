import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/product.dart';  // Import the Product model

class InventoryListPage extends StatefulWidget {
  @override
  _InventoryListPageState createState() => _InventoryListPageState();
}

class _InventoryListPageState extends State<InventoryListPage> {
  late List<Product> products = [];

  // Load products data from assets
  Future<void> loadProducts() async {
    final String response = await rootBundle.loadString('assets/data/products.json');
    final List<dynamic> data = json.decode(response);
    setState(() {
      products = data.map((item) => Product.fromJson(item)).toList();
    });
  }

  @override
  void initState() {
    super.initState();
    loadProducts();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Inventory List"),
      ),
      body: products.isEmpty
          ? Center(child: CircularProgressIndicator()) // Show loading indicator while fetching data
          : ListView.builder(
              itemCount: products.length,
              itemBuilder: (context, index) {
                final product = products[index];
                return ListTile(
                  contentPadding: EdgeInsets.all(8.0),
                  leading: Icon(Icons.inventory, size: 40),
                  title: Text(product.name),
                  subtitle: Text(product.description),
                  trailing: Text('Stock: ${product.stock}'),
                  onTap: () {
                    // Optionally, navigate to the product details page
                  },
                );
              },
            ),
    );
  }
}