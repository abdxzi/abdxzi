import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:neet_app/helper/helper.dart';

class AdHelper {
  static String bannerAdUnitId = "<ID>";
  static String interstitialAdUnitId = "<ID>";
}

class BannerAds extends StatefulWidget {
  const BannerAds({Key? key}) : super(key: key);

  @override
  State<BannerAds> createState() => _BannerAdsState();
}

class _BannerAdsState extends State<BannerAds> {
  late BannerAd _bannerAd;
  bool _isBannerAdReady = false;

  // Add a flag to track whether the banner has been loaded before disposing.
  bool _hasBannerLoaded = false;

  void _loadBannerAd() {
    // Dispose of the previous banner ad, if it has been loaded before.
    if (_hasBannerLoaded) {
      _bannerAd.dispose();
    }

    _bannerAd = BannerAd(
      adUnitId: AdHelper.bannerAdUnitId,
      request: const AdRequest(),
      size: AdSize.banner,
      listener: BannerAdListener(
        onAdLoaded: (_) {
          printFcn("Loaded ------------------->");
          setState(() {
            _isBannerAdReady = true;
          });

          // Set the flag to indicate that the banner has been loaded.
          _hasBannerLoaded = true;
        },
        onAdFailedToLoad: (ad, err) {
          setState(() {
            _isBannerAdReady = false;
          });
          ad.dispose();
        },
      ),
    );

    _bannerAd.load();
  }

  @override
  void initState() {
    super.initState();
    _loadBannerAd();
  }

  @override
  void dispose() {
    // Dispose of the banner ad only if it has been loaded before.
    if (_hasBannerLoaded) {
      _bannerAd.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return (_isBannerAdReady
        ? Container(
            width: _bannerAd.size.width.toDouble(),
            height: _bannerAd.size.height.toDouble(),
            child: AdWidget(ad: _bannerAd),
          )
        : Container(
            child: Text("Koooi"),
          ));
  }
}




class InterstitialAds {
  static InterstitialAd? _interstitialAd;

  // InterstitialAds () {
  //   loadInterstitialAd();
  // }

  static void loadInterstitialAd() {
    
    InterstitialAd.load(
      adUnitId: AdHelper.interstitialAdUnitId,
      request: const AdRequest(),
      adLoadCallback: InterstitialAdLoadCallback(
        onAdLoaded: (ad) {
          _interstitialAd = ad;
          print('InterstitialAd loaded');
        },
        onAdFailedToLoad: (error) {
          print('InterstitialAd failed to load: $error');
        },
      ),
    );
  }

  static void showInterstitialAd() {
    if (_interstitialAd == null) {
      print('InterstitialAd was not loaded.');
      return;
    }

    _interstitialAd!.fullScreenContentCallback = FullScreenContentCallback(
      // Called when the ad showed the full screen content.
      // onAdShowedFullScreenContent: (ad) {},

      // Called when an impression occurs on the ad.
      // onAdImpression: (ad) {},

      // Called when a click is recorded for an ad.
      // onAdClicked: (ad) {},

      onAdDismissedFullScreenContent: (ad) {
        _interstitialAd = null;
        ad.dispose();
      },
      onAdFailedToShowFullScreenContent: (ad, error) {
        _interstitialAd = null;
        ad.dispose();
      },
    );

    _interstitialAd!.show();
  }
}