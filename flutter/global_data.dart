class GlobalData {
  static final GlobalData _instance = GlobalData._internal();

  factory GlobalData() {
    return _instance;
  }

  GlobalData._internal();

  String appDocDir = "";
  List<int> downloadedFiles = [];
  String remoteUri = "";
}


// import 'package:neet_app/models/global_data.dart';
// GlobalData().appDocDir = appDocDir.path;
// GlobalData().appDocDir