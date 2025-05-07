import 'dart:convert';
import 'package:flutter/services.dart';

Future<List<Map<String, dynamic>>> getProductData() async {
  // Load products.json file from assets
  String data = await rootBundle.loadString('assets/data/products.json');
  List<dynamic> jsonResult = json.decode(data);
  
  return List<Map<String, dynamic>>.from(jsonResult);
}