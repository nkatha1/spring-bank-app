// presentation/order_summary_page.dart
import 'package:flutter/material.dart';

class OrderSummaryPage extends StatelessWidget {
  final List<Map<String, dynamic>> products;
  final double totalAmount;

  OrderSummaryPage({required this.products, required this.totalAmount});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Order Summary")),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Order Summary', style: Theme.of(context).textTheme.headline5),
            SizedBox(height: 20),
            ListView.builder(
              itemCount: products.length,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                var product = products[index];
                return ListTile(
                  title: Text(product['name']),
                  subtitle: Text('Quantity: ${product['quantity']}'),
                  trailing: Text('\$${product['price'] * product['quantity']}'),
                );
              },
            ),
            Divider(),
            Text("Total Amount: \$${totalAmount.toStringAsFixed(2)}", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Spacer(),
            ElevatedButton(
              onPressed: () {
                // Handle order finalization logic
              },
              child: Text("Finalize Order"),
            ),
          ],
        ),
      ),
    );
  }
}