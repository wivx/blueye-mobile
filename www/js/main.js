var isDebug = false;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

}

function updateFaceDetection(faceResultSet) {


  var clientWidth = document.getElementById("myImage").clientWidth;
  var clientHeight = document.getElementById("myImage").clientHeight;

  var largeVal = (clientWidth >= clientHeight) ? clientWidth : clientHeight;
  var smallVal = (clientWidth >= clientHeight) ? clientHeight : clientWidth;

  var realWidth = 800, realHeight = 450;
  realWidth = (clientWidth >= clientHeight) ? 800 : 450;
  realHeight = (clientWidth >= clientHeight) ? 450 : 800;

  // construct face object
  for (var i = 0; i < faceResultSet.length; i++) {
    var currentFace = faceResultSet[i];
    var face = {
      age: currentFace.age.ageRange,
      gender: currentFace.gender.gender,
      left: currentFace.positionX,
      top: currentFace.positionY,
      width: currentFace.width
    };

    var displayLeft = Math.floor((face.left / realWidth) * 100) + "%";
    var displayTop = Math.floor((face.top / realHeight) * 100) + "%";
    var displayWidth = Math.floor((face.width / realWidth) * 100) + "%";
    var displayHeight = Math.floor((face.width / realHeight) * 100) + "%";

    var genderType = (face.gender == "MALE") ? "male" : "female";

    var blockHTML = "<div style=\"top: " + displayTop + "; left: " + displayLeft + "; width: " + displayWidth + "; height: " + displayHeight + ";\" class=\"" + genderType + "_block\"></div>";

    blockHTML += "<span style=\"top: " + displayTop + "; left: " + displayLeft + ";\" class=\"" + genderType + "_text\">" + face.gender + "  " + face.age + "</span>";

    // console.log(blockHTML);

    document.getElementById('pic').innerHTML += blockHTML;

  }

}

function debug(msg) {
  if (isDebug) {
    alert(msg);
  } else {
    // do nothing
  }
}

function changeDebug() {
  isDebug = !isDebug;
  if (isDebug) {
    document.getElementById('debug').innerHTML = "Debug Mode On";
  } else {
    document.getElementById('debug').innerHTML = "Debug Mode Off";
  }
}


////////////////////////////////////////////////////////

function show() {
  var root = document.getElementById('item');
  root.setAttribute('class', 'photo-focus-info show');
}

function showFocus() {
  var root = document.getElementById('focus');
  root.setAttribute('class', 'photo-focus show');
}


//////////////////////////////////////////////////////////////

// start of jquery-document-ready
//(function(){

angular.module('blueyeMainPage', ['ngMaterial', 'ngMessages'])
		.controller('mainAppCtrl', function ($scope, $mdDialog, $mdMedia, $timeout, $mdSidenav, $log, $filter) {

      setTimeout(function(){
        $("#loading_cover").hide();
      }, 3000);

    $scope.isEnableWatson = true;

    $scope.inputDataIBM = [
      {
        "age": {
          "score": "0.600433",
          "ageRange": "<18"
        },
        "gender": {
          "score": "0.978119",
          "gender": "MALE"
        },
        "positionY": "",
        "height": "442",
        "width": "442",
        "positionX": "1224"
      },
      {
        "age": {
          "score": "0.389988",
          "ageRange": "35-44"
        },
        "gender": {
          "score": "0.991837",
          "gender": "FEMALE"
        },
        "positionY": "306",
        "height": "363",
        "width": "363",
        "positionX": "2147"
      },
      {
        "age": {
          "score": "0.502411",
          "ageRange": "18-24"
        },
        "gender": {
          "score": "0.994514",
          "gender": "MALE"
        },
        "positionY": "442",
        "height": "510",
        "width": "510",
        "positionX": "408"
      },
      {
        "age": {
          "score": "0.543546",
          "ageRange": "55-64"
        },
        "gender": {
          "score": "0.90025",
          "gender": "FEMALE"
        },
        "positionY": "519",
        "height": "408",
        "width": "408",
        "positionX": "2810"
      },
      {
        "age": {
          "score": "0.517064",
          "ageRange": "<18"
        },
        "gender": {
          "score": "0.668188",
          "gender": "FEMALE"
        },
        "positionY": "689",
        "height": "410",
        "width": "410",
        "positionX": "1760"
      },
      {
        "age": {
          "score": "0.447907",
          "ageRange": "55-64"
        },
        "gender": {
          "score": "0.995504",
          "gender": "FEMALE"
        },
        "positionY": "969",
        "height": "408",
        "width": "408",
        "positionX": "2510"
      },
      {
        "age": {
          "score": "0.840543",
          "ageRange": "<18"
        },
        "gender": {
          "score": "0.987872",
          "gender": "FEMALE"
        },
        "positionY": "1507",
        "height": "431",
        "width": "431",
        "positionX": "2232"
      }
    ];

    $scope.inputDataCV = [
      {
        "age": {
          "score": "0.600433",
          "ageRange": "CV"
        },
        "gender": {
          "score": "0.978119",
          "gender": "CV"
        },
        "positionY": "",
        "height": "442",
        "width": "442",
        "positionX": "1224"
      },
      {
        "age": {
          "score": "0.840543",
          "ageRange": "CV"
        },
        "gender": {
          "score": "0.987872",
          "gender": "CV"
        },
        "positionY": "1507",
        "height": "431",
        "width": "431",
        "positionX": "2232"
      }
    ];

    // picture info from camera
    $scope.picture = {
      width: 800,
      height: 450
    };
    // people data load from server
    $scope.peopleData = [];
    /////////////////////////////////////////////////
    $scope.covertData = function (source) {

      var dest = [];

      if (!source) return;

      for (var i = 0; i < source.length; i++) {
        var currentPeople = source[i];

        // process senstive age
        var age = currentPeople.age.ageRange;
        // type1: <18
        if (age.indexOf("<") > -1) age = age.replace('<', '');
        // type2: range
        if (age.indexOf("-") > -1) age = age.split("-")[0];

        var newPeople = {
          x: currentPeople.positionX,
          y: currentPeople.positionY,
          width: currentPeople.width,
          height: currentPeople.height,
          gender: (currentPeople.gender.gender).toLowerCase(),
          age: age,
          recognitionResult: null,
          name: "",
          sourceData: currentPeople
        };

        dest.push(newPeople);

      }

      return dest;
    };



    $(".loading-bar").hide();
    $scope.loadingMsg = "Loading photo information...";
    ////////////////////////////////////////////////////
    $scope.loadImage = function (apikey) {
      
      // unselect
      $scope.currentPeople=null;
      
      // apply result
      if (apikey == "alchemyvision") {
        $scope.isEnableWatson = true;
        $scope.peopleData = $scope.covertData($scope.inputDataIBM);
      } else {
        $scope.isEnableWatson = false;
        $scope.peopleData = $scope.covertData($scope.inputDataCV);
      }
      
      $scope.$apply();
      
    };
    /////////////////////////////////////////////////
    $scope.takeNewPicture = function (apikey, source) {
      $scope.loadingMsg = "Loading IBM Alchemy Vision Result...";
      $(".loading-bar").show();
      $(".photo-focus").each(function () { $(this).removeClass('show'); });
      $(".photo-focus-info").each(function () { $(this).removeClass('show'); });
      $scope.takePicture(apikey, source);
    };
    /////////////////////////////////////////////////////
    $scope.takePicture = function (apikey, source) {
      debug("take picture, smile :)");
      
      var imageSource = Camera.PictureSourceType.CAMERA;
      if(source=='album') imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
      
      navigator.camera.getPicture(function (imageData) {
        debug("photo collect done, start upload");
        var image = document.getElementById('currentImage');
        image.src = "data:image/jpeg;base64," + imageData;
     
        
        var img = new Image();
        img.src = "data:image/jpeg;base64," + imageData;
        
        if (img.complete) { // was cached
            $scope.picture.width = img.width;
            $scope.picture.height = img.height;
            $scope.$apply();
        }
        else { // wait for decoding
            img.onload = function() {
              $scope.picture.width = img.width;
              $scope.picture.height = img.height;
              $scope.$apply();
            }
        }
        
        // show image
        $(".photo-image").each(function () {
          $(this).removeClass('show');
          $(this).addClass('show');
        });

        // IBM Watson ,vrecognition
        $.ajax({
          url: "http://blueye-adapter.payment-gateway.solutions/james.php",
          type: 'POST',
          data: "apikey=" + apikey + "&base64_img=" + imageData,
          success: function (response) {
            debug("success: " + response);
            var result = $.parseJSON(response);
            // updateFaceDetection(result);

            // save input data
            $scope.inputDataIBM = result;

            $scope.peopleData = $scope.covertData(result);
            $scope.$apply();

            $(".photo-focus").each(function () { $(this).addClass('show'); });
            $(".photo-focus-info").each(function () { $(this).addClass('show'); });
            // $scope.$apply();

            $scope.loadingMsg = "Loading OpenCV Result...";
            $scope.$apply();

            // Open CV
            $.ajax({
              url: "http://blueye-adapter.payment-gateway.solutions/james.php",
              type: 'POST',
              data: "apikey=opencvpi&base64_img=" + imageData,
              success: function (response) {
                debug("opencv success: " + response);
                var result = $.parseJSON(response);
                $scope.inputDataCV = result;
                $(".loading-bar").hide();
              }, error: function (response) {
                debug("opencv fail" + response);
                $(".loading-bar").hide();
              },
              //Options to tell jQuery not to process data or worry about content-type.
              cache: false,
              processData: false
            });

            if (isDebug) document.getElementById('msg').innerHTML = response;
          },
          error: function (response) {
            debug("uploaded fail" + response);
            $(".loading-bar").hide();
            if (isDebug) document.getElementById('msg').innerHTML = response;
          },
          //Options to tell jQuery not to process data or worry about content-type.
          cache: false,
          processData: false
        });

      }, function (message) {
        debug('Failed because: ' + message);
      }, {
          quality: 80,
          destinationType: Camera.DestinationType.DATA_URL
          ,targetWidth: 800
          ,targetHeight: 450 // the base value
          ,sourceType: imageSource
          ,saveToPhotoAlbum: true
        });
    };
    ////////////////////////////////////////////////

    $scope.visualRecognition = function (imageData, userData) {

      // do not recognition twice
      if(userData.recognitionResult) {
        return;
      }

      // debug("calling james vrecognition");

      $scope.loadingMsg = "Loading IBM Visual Recognition Result...";
      $(".loading-bar").show();

      $.ajax({
        url: "http://blueye-adapter.payment-gateway.solutions/james.php",
        type: 'POST',
        data: "apikey=vrecognition&base64_img=" + imageData,
        success: function (response) {
          
          try {
            // debug("vrecognition success: " + response);
            var result = $.parseJSON(response);
            userData.recognitionResult = result;
            
            if(result.images && Array.isArray(result.images) && result.images.length > 0) {
            
              // 判斷資料
              var scores = result.images[0].scores;
              var maxScoreName = "", maxScore=0, candidate="";
              for(var i=0; i<scores.length; i++) {
                var currentScore = scores[i];
                if(currentScore.score>maxScore) {
                  maxScore = currentScore.score;
                  maxScoreName = currentScore.name;
                }
                candidate += currentScore.name+"("+ Math.round( currentScore.score * 100 ) / 100 +"); ";
              }
              // debug("userData.name = maxScoreName " + maxScoreName);
              userData.name = maxScoreName;
              userData.sourceData.candidate = candidate;
            
            } else {
              userData.name = "Unknow";
            }
            
            $(".loading-bar").hide();
            $scope.$apply();
            debug("vrecognition done");
            
          } catch(err) {
            
            debug("vrecognition error: may be format error");
            
            $scope.loadingMsg = "Loading IBM Visual Recognition Failed.";
            $scope.$apply();
            
            setTimeout(function(){
              $(".loading-bar").hide();
              $scope.$apply();
            },3000);
            
          }
        }, error: function (response) {
          // debug("vrecognition fail" + response);
          $scope.loadingMsg = "Loading IBM Visual Recognition Failed.";
          $scope.$apply();
        },
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        processData: false
      });
    };
    
    ////////////////////////////////////////////////

    $scope.currentPeople = null;

    $scope.cropPicture = function (x, y, width, height, userData) {
      debug("crop picture");
      $scope.currentPeople = userData.sourceData;
      
      debug("start canvas");
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      var imageObj = new Image();

      // Store the current transformation matrix
      context.save();

      // Use the identity matrix while clearing the canvas
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Restore the transform
      context.restore();

      imageObj.onload = function () {
        debug("image onload");
        
        // draw cropped image
        var sourceX = x;
        var sourceY = y;
        var sourceWidth = width;
        var sourceHeight = height;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = canvas.width / 2 - destWidth / 2;
        var destY = canvas.height / 2 - destHeight / 2;
        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
      };

      debug("image source load");
      // source
      imageObj.src = document.getElementById('currentImage').src;

      debug("canvas par");
      var dataURL = canvas.toDataURL();
      //document.getElementById('base64Result').innerHTML = dataURL;
      debug("prepare to post to server");
      // post to server
      $scope.visualRecognition(dataURL, userData);
      $scope.$apply();
    };



  });

//}); // end of jquery-document-ready


/*

(function () {
	'use strict';

	angular.module('blueyeMainPage', ['ngMaterial', 'ngMessages'])
		.controller('AppCtrl', function ($scope, $mdDialog, $mdMedia, $timeout, $mdSidenav, $log, $filter) {
			$scope.status = '  ';
			$scope.isDisplayProgressBar = false;


			$scope.isEnableWatson = true;

			///////////////////////////////////////////////////////////////////////

			$scope.takePicture = function (apikey) {
				// debug("take picture, smile :)");
				navigator.camera.getPicture(function (imageData) {
					// debug("photo collect done!");
					var image = document.getElementById('myImage');
					image.src = "data:image/jpeg;base64," + imageData;

					// debug("uploading!");
					$scope.isDisplayProgressBar = true;
					$.ajax({
						url: "http://blueye-adapter.payment-gateway.solutions/james.php",
						type: 'POST',
						data: "apikey=" + apikey + "&base64_img=" + imageData,
						success: function (response) {
							// debug("uploaded" + response);
							$scope.isDisplayProgressBar = false;
							var result = $.parseJSON(response);
							updateFaceDetection(result);
							if (isDebug) document.getElementById('msg').innerHTML = response;
						},
						error: function (response) {
							// debug("uploaded" + response);
							$scope.isDisplayProgressBar = false;
							if (isDebug) document.getElementById('msg').innerHTML = response;
						},
						//Options to tell jQuery not to process data or worry about content-type.
						cache: false,
						processData: false
					});

				}, function (message) {
					debug('Failed because: ' + message);
				}, {
						quality: 50,
						destinationType: Camera.DestinationType.DATA_URL,
						targetWidth: 450,
						targetHeight: 800
					});
			};

			////////////////////////////////////////////////////////////////////

		});

});

*/