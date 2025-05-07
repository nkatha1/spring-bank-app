import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../data/products.dart';

class ProductSelectionPage extends StatefulWidget {
  @override
  _ProductSelectionPageState createState() => _ProductSelectionPageState();
}

class _ProductSelectionPageState extends State<ProductSelectionPage> {
  int selectedQuantity = 1;
  List<Map<String, dynamic>> products = [];

  @override
  void initState() {
    super.initState();
    loadProducts();
  }

  // Load products data
  Future<void> loadProducts() async {
    products = await getProductData();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Select Products")),
      body: products.isEmpty
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: products.length,
              itemBuilder: (context, index) {
                var product = products[index];
                return Card(
                  margin: EdgeInsets.all(10),
                  child: ListTile(
                    leading: Image.asset('assets/images/${product["images"][0]}'),
                    title: Text(product["name"]),
                    subtitle: Text("Stock: ${getAvailableStock(product)} units"),
                    trailing: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text('Price: \$${product["price"]}'),
                        Row(
                          children: [
                            IconButton(
                              icon: Icon(Icons.remove),
                              onPressed: () {
                                if (selectedQuantity > 1) {
                                  setState(() {
                                    selectedQuantity--;
                                  });
                                }
                              },
                            ),
                            Text('$selectedQuantity'),
                            IconButton(
                              icon: Icon(Icons.add),
                              onPressed: () {
                                setState(() {
                                  selectedQuantity++;
                                });
                              },
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }

  int getAvailableStock(Map<String, dynamic> product) {
    return product['stock'].fold(0, (sum, warehouse) {
      return sum + (warehouse['quantity'] - warehouse['reserved']);
    });
  }
}