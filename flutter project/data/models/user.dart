class User {
  final String id;
  final String username;
  final String email;
  final String role;
  final String region;

  User({
    required this.id,
    required this.username,
    required this.email,
    required this.role,
    required this.region,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      email: json['email'],
      role: json['role'],
      region: json['region'],
    );
  }
}