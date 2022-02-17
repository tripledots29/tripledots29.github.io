////////////////////////////////////////////////////////////////////////////////////////////////////
//setup whole scene, camera, controls and loaders
////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Create the scene");
var scene = new THREE.Scene();
console.log("Done");

console.log("Create the camera");
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15000);
camera.position.x = 10;
camera.position.y = 150;
camera.position.z = 500;
console.log("Done");

console.log("Create the renderer");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log("Done");

console.log("Create the camera controller");
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(100, 100, 100);
controls.update();
console.log("Done");

console.log("Create loader to load assets in");
var loader = new THREE.TextureLoader();
var objloader = new THREE.OBJLoader();
console.log("Done");

console.log("Create shadow renderer");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
console.log("Done");

//end

////////////////////////////////////////////////////////////////////////////////////////////////////
//setup skyboxes
////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Create the skyboxes");

var format = '.jpg';

var dayPath = "myskybox/day/";
var nightPath = "myskybox/night/";

var dayUrls = [
    dayPath + 'px' + format, dayPath + 'nx' + format,
    dayPath + 'py' + format, dayPath + 'ny' + format,
    dayPath + 'pz' + format, dayPath + 'nz' + format
];
var nightUrls = [
    nightPath + 'px' + format, nightPath + 'nx' + format,
    nightPath + 'py' + format, nightPath + 'ny' + format,
    nightPath + 'pz' + format, nightPath + 'nz' + format
    ];

var dayCubeTexture = new THREE.CubeTextureLoader().load( dayUrls );
var nightCubeTexture = new THREE.CubeTextureLoader().load( nightUrls );

dayCubeTexture.format = THREE.RGBFormat;
nightCubeTexture.format = THREE.RGBFormat;

scene.background = dayCubeTexture; //initialise scene as day time

console.log("Done");

//end

////////////////////////////////////////////////////////////////////////////////////////////////////
//setup lighting
////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Add the ambient light for day time");
var lightAmbient = new THREE.AmbientLight(0x404040, 1); 
scene.add(lightAmbient);
console.log("Done");

console.log("Add torches in all 4 corners");
var geoTorch = new THREE.ConeGeometry(15, 18, 18);
var matTorch = new THREE.MeshBasicMaterial({color: 0xffa500});

var lightTorches = [];
var meshTorches = [];

for(var i = 0; i < 4; i++) //initialise 4 torches
{
    meshTorches[i] = new THREE.Mesh(geoTorch, matTorch);
    lightTorches[i] = new THREE.PointLight(0xffa500, 1, 800, 1); //color, intensity, distance, decay
}

lightTorches[0].position.set(1000, 110, 500);
scene.add(lightTorches[0]);

lightTorches[1].position.set(1000, 110, -500);
scene.add(lightTorches[1]);

lightTorches[2].position.set(-1000, 110, 500);
scene.add(lightTorches[2]);

lightTorches[3].position.set(-1000, 110, -500);
scene.add(lightTorches[3]);

for(var i = 0; i < 4; i++) //set location of 4 torches
{
    scene.add(meshTorches[i]);
    meshTorches[i].position.x = lightTorches[i].position.x;
    meshTorches[i].position.y = lightTorches[i].position.y;
    meshTorches[i].position.z = lightTorches[i].position.z;
}
console.log("Done");

//end

////////////////////////////////////////////////////////////////////////////////////////////////////
//General area
////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Create the floor with bumpy grass texture");
grassTexture = loader.load("grass/grassBase.jpg"); //load grass base 
grassBumpMap = loader.load("grass/grassBump.jpg"); //load grass bump
grassNormalMap = loader.load("grass/grassNormal.jpg"); //load grass normal

grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set( 10, 10 );

meshGenFloor = new THREE.Mesh
(
    new THREE.PlaneGeometry ( 2000, 1000 ),
    new THREE.MeshPhongMaterial
    ({
        color: 0xffffff,
        map: grassTexture,
        bumpMap: grassBumpMap,
        normalMap: grassNormalMap,
        side: THREE.DoubleSide

    })
);

meshGenFloor.rotation.x =  Math.PI / -2;
scene.add(meshGenFloor);
meshGenFloor.castShadow = false; //no casting of the floor
meshGenFloor.receiveShadow = true;
console.log("Done");

console.log("Setup fence texture and normal map for all walls");
fenceTexture = loader.load("fence/fenceBase.jpg"); //load fence base 
fenceNormalMap = loader.load("fence/fenceNormal.jpg"); //load fence normal

fenceTexture.wrapS = fenceTexture.wrapT = THREE.RepeatWrapping;
fenceTexture.repeat.set( 10, 1 ); // fence repeats enough to not stretch

var matFence = 
{
    color: 0xffffff,
    map: fenceTexture,
    normalMap: fenceNormalMap,
    side: THREE.DoubleSide
}
console.log("Done");


console.log("Create the back wall");
var geoBackWall = new THREE.PlaneGeometry( 2000, 100 ); //width height
var matBackWall = new THREE.MeshPhongMaterial(matFence);
var meshBackWall = new THREE.Mesh(geoBackWall, matBackWall);
meshBackWall.position.y = meshBackWall.geometry.parameters.height/2;
meshBackWall.position.z = meshGenFloor.geometry.parameters.height/-2;
scene.add(meshBackWall);
console.log("Done");

console.log("Create the side wall right");
var geoSideWall = new THREE.PlaneGeometry( 1000, 100 ); //width height
var matSideWall = new THREE.MeshPhongMaterial(matFence);
var meshRightWall = new THREE.Mesh(geoSideWall, matSideWall);
meshRightWall.position.y = meshRightWall.geometry.parameters.height/2;
meshRightWall.position.x = meshGenFloor.geometry.parameters.height;
meshRightWall.rotation.y = Math.PI/2;
scene.add(meshRightWall);
console.log("Done");

console.log("Create the side wall left");
var meshLeftWall = new THREE.Mesh(geoSideWall, matSideWall);
meshLeftWall.position.y = meshLeftWall.geometry.parameters.height/2;
meshLeftWall.position.x = meshGenFloor.geometry.parameters.height * -1;
meshLeftWall.rotation.y = Math.PI/2;
scene.add(meshLeftWall);
console.log("Done");

console.log("Create the front wall left");
var geoFrontWall = new THREE.PlaneGeometry( 900, 100 ); //width height
var matFrontWall = new THREE.MeshPhongMaterial(matFence);
var meshFrontWallLeft = new THREE.Mesh(geoFrontWall, matFrontWall);
meshFrontWallLeft.position.y = meshFrontWallLeft.geometry.parameters.height/2;
meshFrontWallLeft.position.z = meshGenFloor.geometry.parameters.height/2;
meshFrontWallLeft.position.x= -550;
scene.add(meshFrontWallLeft);
console.log("Done");

console.log("Create the front wall right");
var meshFrontWallRight = new THREE.Mesh(geoFrontWall, matFrontWall);
meshFrontWallRight.position.y = meshFrontWallRight.geometry.parameters.height/2;
meshFrontWallRight.position.z = meshGenFloor.geometry.parameters.height/2;
meshFrontWallRight.position.x= 550;
scene.add(meshFrontWallRight);
console.log("Done");
 
//doors

console.log("Setup door texture and normal map for both doors");
doorTexture = loader.load("door/doorBase.jpg"); //load fence base 
doorNormalMap = loader.load("door/doorNormal.jpg"); //load fence normal
doorMetallicMap = loader.load("door/doorMetallic.jpg"); //load fence normal

var matWoodenDoor = 
{
    color: 0xffffff,
    map: doorTexture,
    normalMap: doorNormalMap,
    metalnessMap: doorMetallicMap,
    metalness: 1,
    side: THREE.DoubleSide
}
console.log("Done");


console.log("Create the door left");
var geoDoor = new THREE.PlaneGeometry( 100, 100 ); //width height
var matDoor = new THREE.MeshPhongMaterial(matWoodenDoor);
var meshDoorLeft = new THREE.Mesh(geoDoor, matDoor);
meshDoorLeft.position.y = meshDoorLeft.geometry.parameters.height/2;
meshDoorLeft.position.z = meshGenFloor.geometry.parameters.height/2;
meshDoorLeft.position.x= -50;
scene.add(meshDoorLeft);
console.log("Done");

console.log("Create the door right");
var meshDoorRight = new THREE.Mesh(geoDoor, matDoor);
meshDoorRight.position.y = meshDoorRight.geometry.parameters.height/2;
meshDoorRight.position.z = meshGenFloor.geometry.parameters.height/2;
meshDoorRight.position.x= 50;
scene.add(meshDoorRight);
console.log("Done");

console.log("Create the door opener and night time function");
var doorsOpen = false; //doors set to closed at start
var nightTime = false; //time set to day at start
var HelperOn = false; //set helper to off
document.onkeyup = function onKeyUp(e)
{
    if(e.keyCode == 32) // 32 = space bar
    {
        //on key up of SpaceBar - perform function to open or close doors
        if(doorsOpen == false)
        {
            doorsOpen = true;

            //open left
            meshDoorLeft.position.x = -98;
            meshDoorLeft.position.z = meshGenFloor.geometry.parameters.height/2 + 50;
            meshDoorLeft.rotation.y = Math.PI/2;

            //open right
            meshDoorRight.position.x = 98;
            meshDoorRight.position.z = meshGenFloor.geometry.parameters.height/2 + 50;
            meshDoorRight.rotation.y = Math.PI/-2;
            console.log("Door open is " + doorsOpen);
        }
        else
        {
            doorsOpen = false;

            //close left
            meshDoorLeft.position.x = -50;
            meshDoorLeft.position.z = meshGenFloor.geometry.parameters.height/2;
            meshDoorLeft.rotation.y = 0;

            //close right
            meshDoorRight.position.x = 50;
            meshDoorRight.position.z = meshGenFloor.geometry.parameters.height/2;
            meshDoorRight.rotation.y = 0;

            console.log("Door open is " + doorsOpen);
        }
    }

    if(e.keyCode == 78) // 78 = n/N
    {
        if(nightTime == false) //if day time, change to night
        {
            nightTime = true;
            scene.remove(lightAmbient);
            scene.background = nightCubeTexture

        }

        else //if night time, change to day
        {
            nightTime = false;
            scene.add(lightAmbient);
            scene.background = dayCubeTexture;

        }
    }
    if(e.keyCode == 72) //72 = h/H
    
    {
        if(HelperOn == false)
        {
            HelperOn = true; //turn helper on
            scene.add( spotLightBalloonsHelper );
            console.log("Helper is " + HelperOn);
        }

        else
        {
            HelperOn = false; //turn helper off
            scene.remove( spotLightBalloonsHelper );
            console.log("Helper is " + HelperOn);
        }
    }


         
}
console.log("Done");


//pathway
console.log("Setup pathway texture and normal map");
pathTexture = loader.load("path/pathBase.jpg"); //load fence base 
pathNormalMap = loader.load("path/pathNormal.jpg"); //load fence normal

pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
pathTexture.repeat.set( 2, 10 ); // cobbles repeats enough to not stretch

var matCobbles = 
{
    color: 0xffffff,
    map: pathTexture,
    normalMap: pathNormalMap,
    side: THREE.DoubleSide
}
console.log("Done");

console.log("Create the pathway");
var geoPathWay = new THREE.PlaneGeometry( 200, 1000 );
var matPathWay  = new THREE.MeshPhongMaterial(matCobbles);
var meshPathWay = new THREE.Mesh(geoPathWay , matPathWay);
meshPathWay.position.z = 1000
meshPathWay.rotation.x =  Math.PI / 2;
scene.add(meshPathWay);
console.log("Done");

console.log("Setup pathway wall texture and normal map");
pathWallBase= loader.load("pathWall/pathWallBase.jpg"); //load fence base 
pathWallNormalMap = loader.load("pathWall/pathWallNormal.jpg"); //load fence normal

pathWallBase.wrapS = pathWallBase.wrapT = THREE.RepeatWrapping;
pathWallBase.repeat.set( 8, 16 ); // cobbles repeats enough to not stretch

var matPathWall = 
{
    color: 0xffffff,
    map: pathWallBase,
    normalMap: pathWallNormalMap,
    side: THREE.DoubleSide
}
console.log("Done");

console.log("Create the pathway wall left");
var geoPathWayWall = new THREE.PlaneGeometry( 100, 1000 );
var matPathWayWall  = new THREE.MeshPhongMaterial(matPathWall);
var meshPathWayWallLeft = new THREE.Mesh(geoPathWayWall , matPathWayWall);
meshPathWayWallLeft.position.x = 100
meshPathWayWallLeft.position.y = meshPathWayWallLeft.geometry.parameters.width/2;
meshPathWayWallLeft.position.z = 1000
meshPathWayWallLeft.rotation.x =  Math.PI / 2;
meshPathWayWallLeft.rotation.y =  Math.PI / 2;
scene.add(meshPathWayWallLeft);
console.log("Done");

console.log("Create the pathway wall left");
var meshPathWayWallRight = new THREE.Mesh(geoPathWayWall , matPathWayWall);
meshPathWayWallRight.position.x = -100
meshPathWayWallRight.position.y = meshPathWayWallRight.geometry.parameters.width/2;
meshPathWayWallRight.position.z = 1000
meshPathWayWallRight.rotation.x =  Math.PI / 2;
meshPathWayWallRight.rotation.y =  Math.PI / 2;
scene.add(meshPathWayWallRight);
console.log("Done");

console.log("Create the pathway wall back");
var geoPathWayWallBack = new THREE.PlaneGeometry( 200, 200 );
var matPathWayWallBack  = new THREE.MeshPhongMaterial(matPathWall);
var meshPathWayWallBack = new THREE.Mesh(geoPathWayWallBack , matPathWayWallBack);
meshPathWayWallBack.position.y = meshPathWayWallBack.geometry.parameters.height/2;
meshPathWayWallBack.position.z = 1500;
scene.add(meshPathWayWallBack);
console.log("Done");

//end

////////////////////////////////////////////////////////////////////////////////////////////////////
//arrow area
////////////////////////////////////////////////////////////////////////////////////////////////////

function deformBox(boxLength, boxDepth, Xoffset, Yoffset, Zoffset, Xrotate, Yrotate, Zrotate, )
{
    
    var geoArrowEnd= new THREE.BoxGeometry(boxLength, boxLength, boxDepth);

    //set vertices  to new xyz

    //10,10,0.5 top right positive z
    geoArrowEnd.attributes.position.setXYZ( 0,  (boxLength*3), (boxLength*-1), (boxDepth/2) ); 
    geoArrowEnd.attributes.position.setXYZ( 11, (boxLength*3), (boxLength*-1), (boxDepth/2) ); 
    geoArrowEnd.attributes.position.setXYZ( 17, (boxLength*3), (boxLength*-1), (boxDepth/2) ); 
    
    //10,10,-0.5 top right negative z
    geoArrowEnd.attributes.position.setXYZ( 1,  (boxLength*3), (boxLength*-1), (boxDepth/-2) ); 
    geoArrowEnd.attributes.position.setXYZ( 9,  (boxLength*3), (boxLength*-1), (boxDepth/-2) ); 
    geoArrowEnd.attributes.position.setXYZ( 20, (boxLength*3), (boxLength*-1), (boxDepth/-2) ); 

    //-10,-10,0.5 bottom left positive z
    geoArrowEnd.attributes.position.setXYZ( 7,  (boxLength*-3), (boxLength), (boxDepth/2) ); 
    geoArrowEnd.attributes.position.setXYZ( 12, (boxLength*-3), (boxLength), (boxDepth/2) ); 
    geoArrowEnd.attributes.position.setXYZ( 18, (boxLength*-3), (boxLength), (boxDepth/2) ); 


    //-10,-10,-0.5 bottom left negative z
    geoArrowEnd.attributes.position.setXYZ( 6,  (boxLength*-3), (boxLength), (boxDepth/-2) ); 
    geoArrowEnd.attributes.position.setXYZ( 14, (boxLength*-3), (boxLength), (boxDepth/-2) ); 
    geoArrowEnd.attributes.position.setXYZ( 23, (boxLength*-3), (boxLength), (boxDepth/-2) ); 


    geoArrowEnd.attributes.position.needsUpdate = true;
    
    var matArrowEnd = new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide });
    var meshArrowEnd = new THREE.Mesh(geoArrowEnd, matArrowEnd);
    
    meshArrowEnd.position.x = Xoffset;
    meshArrowEnd.position.y = Yoffset;
    meshArrowEnd.position.z = Zoffset;

    meshArrowEnd.rotation.x = Xrotate;
    meshArrowEnd.rotation.y = Yrotate;
    meshArrowEnd.rotation.z = Zrotate;
    
    return meshArrowEnd;

}

function createArrow(arrowX, arrowY, arrowZ)
{
    var widthOfArrow = 0.35;
    var lengthOfArrowFletching= 0.8;

    console.log("Create the arrow head (cone)");
    var geoArrowHead = new THREE.ConeGeometry( 1, 10, 3 ); //width, height, sides
    var matArrowHead = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide });
    var meshArrowHead = new THREE.Mesh(geoArrowHead, matArrowHead);
    meshArrowHead.position.x = arrowX;
    meshArrowHead.position.y = arrowY;
    meshArrowHead.position.z = arrowZ;
    meshArrowHead.rotation.x = Math.PI/-2; //aim towards board
    scene.add(meshArrowHead);
    meshArrowHead.castShadow = true;
    meshArrowHead.receiveShadow = true;
    console.log("Done");

    console.log("Create the arrow middle (cylinder)");
    var geoArrowMid = new THREE.CylinderGeometry( widthOfArrow, widthOfArrow, 20 ); //radius top, radius bottom, height
    var matArrowMid = new THREE.MeshPhongMaterial({color: 0x964b00, side: THREE.DoubleSide });
    var meshArrowMid = new THREE.Mesh(geoArrowMid, matArrowMid);
    meshArrowMid.position.y = ((meshArrowHead.geometry.parameters.height) * -1.5); //-1.5x arrow head height
    meshArrowHead.add(meshArrowMid);
    meshArrowMid.castShadow = true;
    meshArrowMid.receiveShadow = true;
    console.log("Done");
    
    console.log("Create the arrow end (deformed boxes)");
    meshArrowMid.add(deformBox(lengthOfArrowFletching, widthOfArrow, meshArrowMid.geometry.parameters.radiusTop*2, -10, 0, 0, Math.PI, Math.PI/2)); //right
    meshArrowMid.add(deformBox(lengthOfArrowFletching, widthOfArrow, meshArrowMid.geometry.parameters.radiusTop*-2, -10, 0, 0, Math.PI*2, Math.PI/2)); //left - x offset is to the left, y rotate is flipped
    meshArrowMid.add(deformBox(lengthOfArrowFletching, widthOfArrow, 0, -10, meshArrowMid.geometry.parameters.radiusTop*2, 0, Math.PI/2, Math.PI/2)); //front - x offset at origin, z offset closer, y rotate half flipped
    meshArrowMid.add(deformBox(lengthOfArrowFletching, widthOfArrow, 0, -10, meshArrowMid.geometry.parameters.radiusTop*-2, 0, Math.PI/-2, Math.PI/2)); //back - x offset at origin, z offset further, y rotate inverse of half flipped
    console.log("Done");

    
    return meshArrowHead;
    
}
 
//end

////////////////////////////////////////////////////////////////////////////////////////////////////
//balloon area
////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Create the balloon floor");
var geoBalloonsFloor = new THREE.PlaneGeometry( 500, 100 );
var matBalloonsFloor = new THREE.MeshPhongMaterial({color: 0xCCCCCC, side: THREE.DoubleSide });
var meshBalloonsFloor = new THREE.Mesh(geoBalloonsFloor, matBalloonsFloor);
meshBalloonsFloor.rotation.x =  Math.PI / 2;
meshBalloonsFloor.position.x = meshGenFloor.geometry.parameters.height/2;
meshBalloonsFloor.position.y = 1;
meshBalloonsFloor.position.z = 0;
scene.add(meshBalloonsFloor);
console.log("Done");


console.log("Create the balloon board");
var geoBalloonBoard = new THREE.BoxGeometry( 500, 200, 10 ); //width, height, depth
var matBalloonBoard = new THREE.MeshPhongMaterial({color: 0xCCCCCC, side: THREE.DoubleSide });
var meshBalloonBoard = new THREE.Mesh(geoBalloonBoard, matBalloonBoard);
meshBalloonBoard.position.z =  meshBalloonBoard.geometry.parameters.height/-2;
meshBalloonBoard.position.y =  -20;
meshBalloonBoard.rotation.x =  Math.PI / 2;
meshBalloonsFloor.add(meshBalloonBoard); 
meshBalloonBoard.castShadow = true;
meshBalloonBoard.receiveShadow = true;
console.log("Done");

console.log("Create the darts rest");
var geoDartRest = new THREE.BoxGeometry( 500, 50, 50 ); //width, height, depth
var matDartRest = new THREE.MeshPhongMaterial({color: 0xCCCCCC, side: THREE.DoubleSide });
var meshDartRest = new THREE.Mesh(geoDartRest, matDartRest);
meshDartRest.position.z = meshDartRest.geometry.parameters.height/-2; //above ground
meshDartRest.position.y = 250; //away from boards
meshBalloonsFloor.add(meshDartRest); //tied to the targets
meshDartRest.receiveShadow = true;
console.log("Done");

for(var i = 0; i < 15; i++)
{
    meshDartRest.add(createArrow(meshDartRest.geometry.parameters.width /-4 + i*20,0,-52));
}
function createBalloon(balloonOffsetXaxis, balloonOffsetYaxis)
{    

    let balloonRadius = 15;
    
    var colorPicker = Math.floor(Math.random() * 3);
    var colorString = null;
    console.log(colorPicker);
    if (colorPicker == 0)
    {
        colorString = 0xff0000; //red balloon
    }
    else if (colorPicker == 1)
    {
        colorString = 0x00ff00; //green balloon 
    }
    else 
    {
        colorString = 0x0000ff; //blue balloon
    }
    console.log("Create the balloon top");
    var geoBalloonSphere = new THREE.SphereGeometry( balloonRadius, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI );
    var matBalloonSphere = new THREE.MeshPhongMaterial( { color: colorString, shininess: 100, specular: 0x555555 } );
    var meshBalloonSphere = new THREE.Mesh( geoBalloonSphere, matBalloonSphere );
    meshBalloonSphere.rotation.x =  Math.PI / 2;
    meshBalloonSphere.position.x = ((meshBalloonsFloor.geometry.parameters.width/-2)+(meshBalloonSphere.geometry.parameters.radius/2)) + balloonOffsetXaxis;
    meshBalloonSphere.position.z = (meshBalloonSphere.geometry.parameters.radius*2 + balloonOffsetYaxis) * -1; //out of the ground
    meshBalloonsFloor.add(meshBalloonSphere);
    meshBalloonSphere.castShadow = true;
    meshBalloonSphere.receiveShadow = true;
    console.log("Done");

    console.log("Create the balloon bottom");
    var geoBalloonCylinder = new THREE.CylinderGeometry( 2, balloonRadius, 20, 32, 1, 0, Math.PI * 2 );
    var matBalloonCylinder = new THREE.MeshPhongMaterial( { color: colorString, side:THREE.DoubleSide} );
    var meshBalloonCylinder = new THREE.Mesh( geoBalloonCylinder, matBalloonCylinder );
    meshBalloonCylinder.position.y = meshBalloonSphere.geometry.parameters.radius/(meshBalloonSphere.geometry.parameters.radius/10);
    meshBalloonSphere.add(meshBalloonCylinder);
    meshBalloonCylinder.castShadow = true;
    meshBalloonCylinder.receiveShadow = true;
    console.log("Done");

}
    
function inflateBalloons()
{
    meshBalloonSphere.scale.set(meshBalloonSphere.scale.x*1.1, meshBalloonSphere.scale.y*1.1, meshBalloonSphere.scale.z*1.1);
    console.log("Size is" + meshBalloonSphere.scale);
}


console.log("Add a spotlight for balloons");
var spotLightBalloons = new THREE.SpotLight( 0xffffff, 0.7, 0, 15, 0.5, 1); //color, intensity, distance, angle, penumbra, decay
meshDartRest.add(spotLightBalloons);
spotLightBalloons.position.y = 50;
var spotLightBalloonsHelper = new THREE.SpotLightHelper( spotLightBalloons );
scene.add( spotLightBalloonsHelper );
spotLightBalloons.castShadow = true;
console.log("Done");


console.log("Run balloon creation function");
let numOfBalloonsCOL = 10; //how many columns of balloons
let numOfBalloonsROW = 4; //how many rows of balloons

for(let i = 0; i < numOfBalloonsCOL; i++)
{
    for(let j = 0; j < numOfBalloonsROW; j++)
    {
        createBalloon(i*50, j*50);
    }
}
console.log("Done");

//end

////////////////////////////////////////////////////////////////////////////////////////////////////
//bow area
////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Create the bows");

var bow = null;
var bowMat = null;
// load a resource
objloader.load(
	// resource URL
	'bow/bowOBJ.obj',
	// called when resource is loaded
	function ( object ) {
        object.scale.setScalar(30);
	    bow = object;
		//bow.scale.x = bow.scale.y = bow.scale.z = 2;

        // Once the bow model is donwloaded, start loading texture now (inside this callback function)
        loader.load(
        // resource URL
            'bow/bowBase.png',
            // Function when resource is loaded
            function ( texture ) {
                // do something with the texture
                bowMat = new THREE.MeshPhongMaterial( {
                    map: texture,
                    normalMap: new THREE.TextureLoader().load('bow/bowNormal.png'),
                    shininess: 100
                } );

                // add texture to the bow mesh
                bow.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.material = bowMat;
                 }
               });

                
               bow.position.set(-500,52,250);
               bow.rotation.y = Math.PI / 4;
               meshBowRest.castShadow = true;
               scene.add( bow );
            },
            // Function called when download progresses
            function ( xhr ) {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            function ( xhr ) {
                console.log( 'An error happened' );
            }
        );
	},
	// called when loading is in progress
	function ( xhr ) { 

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

console.log("Done");


//end

////////////////////////////////////////////////////////////////////////////////////////////////////
//firing range area
////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Create the targets floor");
var geoTargetsFloor = new THREE.PlaneGeometry( 500, 100 );
var matTargetsFloor = new THREE.MeshLambertMaterial({color: 0xCCCCCC, side: THREE.DoubleSide, roughness: 100 });
var meshTargetsFloor = new THREE.Mesh(geoTargetsFloor, matTargetsFloor);
meshTargetsFloor.rotation.x =  Math.PI / 2;
meshTargetsFloor.position.x = meshGenFloor.geometry.parameters.height/-2;
meshTargetsFloor.position.y = 1;
scene.add(meshTargetsFloor);
meshTargetsFloor.receiveShadow = true;
console.log("Done");

console.log("Create the bow rest");
var geoBowRest = new THREE.BoxGeometry( 500, 50, 50 ); //width, height, depth
var matBowRest = new THREE.MeshPhongMaterial({color: 0xCCCCCC, side: THREE.DoubleSide });
var meshBowRest = new THREE.Mesh(geoBowRest, matBowRest);
meshBowRest.position.z = meshBowRest.geometry.parameters.height/-2; //above ground
meshBowRest.position.y = 250; //away from boards
meshTargetsFloor.add(meshBowRest); //tied to the targets
meshBowRest.castShadow = true;
meshBowRest.receiveShadow = true;
console.log("Done");


function createTargetBoard(offsetXboards)
{
    console.log("Create target backboard");
    var geoBackboard = new THREE.PlaneGeometry( 50, 80 );
    var matBackboard = new THREE.MeshLambertMaterial({color: 0x3a2cd4, side: THREE.DoubleSide });
    var meshBackboard = new THREE.Mesh(geoBackboard, matBackboard);
    meshBackboard.position.x = ((meshTargetsFloor.geometry.parameters.width/-2)+(meshBackboard.geometry.parameters.width/2) + offsetXboards);
    meshBackboard.rotation.x =  Math.PI / -2;
    meshBackboard.position.z = meshBackboard.geometry.parameters.height/-2;
    meshTargetsFloor.add(meshBackboard);
    ///meshBackboard.castShadow = true;
    meshBackboard.receiveShadow = true;
    console.log("Done");

    console.log("Create walls between boards");
    var geoWall = new THREE.BoxGeometry( 5, 100, 100 );
    var matWall = new THREE.MeshLambertMaterial({color: 0x55500a, side: THREE.DoubleSide });
    var meshWallLeft = new THREE.Mesh(geoWall, matWall);
    var meshWallRight = new THREE.Mesh(geoWall, matWall);
    meshWallLeft.position.x = (meshBackboard.geometry.parameters.width/2 + 10) * -1; // *-1 = left of board
    meshWallRight.position.x = (meshBackboard.geometry.parameters.width/2 + 10); // right of board
    meshBackboard.add(meshWallLeft);
    meshBackboard.add(meshWallRight);
    console.log("Done");

    console.log("Create the first target");
    let meshTargetCircles = [];
    var geoTargetCircleMain = new THREE.CircleGeometry( 10, 32 );
    var matTargetCircleMain = new THREE.MeshLambertMaterial( { color: 0x0000ff, side: THREE.DoubleSide, roughness: 100} ); //blue
    meshTargetCircles[0] = new THREE.Mesh(geoTargetCircleMain, matTargetCircleMain);
    meshTargetCircles[0].position.y = 15.0;
    meshTargetCircles[0].position.z = 1.0;
    meshBackboard.add(meshTargetCircles[0])
    console.log("Done");

    // 0,0,0 is bullseye
    let randomArrowPlacment1x = (Math.floor((Math.random() * 11))) * ((Math.round(Math.random()) ? 1 : -1)); //random integer between 0-10, random between positive and negative
    let randomArrowPlacment2x = (Math.floor((Math.random() * 11))) * ((Math.round(Math.random()) ? 1 : -1)); //random integer between 0-10, random between positive and negative
    let randomArrowPlacment3x = (Math.floor((Math.random() * 11))) * ((Math.round(Math.random()) ? 1 : -1)); //random integer between 0-10, random between positive and negative
    
    let randomArrowPlacment1y = (Math.floor((Math.random() * 11))) * ((Math.round(Math.random()) ? 1 : -1)); //random integer between 0-10, random between positive and negative
    let randomArrowPlacment2y = (Math.floor((Math.random() * 11))) * ((Math.round(Math.random()) ? 1 : -1)); //random integer between 0-10, random between positive and negative
    let randomArrowPlacment3y = (Math.floor((Math.random() * 11))) * ((Math.round(Math.random()) ? 1 : -1)); //random integer between 0-10, random between positive and negative

    meshTargetCircles[0].add(createArrow(randomArrowPlacment1x,randomArrowPlacment1y,4)); //randomly place the arrow in the circle with new x and y coords every time
    meshTargetCircles[0].add(createArrow(randomArrowPlacment2x,randomArrowPlacment2y,4)); //randomly place the arrow in the circle with new x and y coords every time
    meshTargetCircles[0].add(createArrow(randomArrowPlacment3x,randomArrowPlacment3y,4)); //randomly place the arrow in the circle with new x and y coords every time
    
    console.log("Create the rest of the targets");
    let targetSize = 20;

    for(let i = 1; i < 11; i++)
    {    
        var geoTargetCircle = new THREE.CircleGeometry( targetSize, 32 );

        if (i%2 == 0)
        {
            matTargetCircle = new THREE.MeshLambertMaterial( { color: 0xff0000, side: THREE.DoubleSide, roughness: 100 } ); //red
        }
        else
        {
            matTargetCircle = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide, roughness: 100 } ); //white
        }

        meshTargetCircles[i] = new THREE.Mesh(geoTargetCircle, matTargetCircle);

        meshTargetCircles[i].position.z = 0.1;
        meshTargetCircles[i-1].add(meshTargetCircles[i])

        targetSize = targetSize - 2;
    }
    console.log("Done");

    
    console.log("Add a spotlight for each targets");
    var spotLightTargets = new THREE.SpotLight( 0xffffff, 1, 200, 15, 0.5, 1); //color, intensity, distance, angle, penumbra, decay
    meshTargetCircles[0].add(spotLightTargets);
    spotLightTargets.position.y = 50;
    //var spotLightTargetsHelper = new THREE.SpotLightHelper( spotLightTargets );
    //scene.add( spotLightTargetsHelper ); //helper to show where the spotlight is aiming, disabled for aesthetics
    spotLightTargets.castShadow = true;
    console.log("Done");
}

console.log("Run target board creation function");
let numOfBoards = 7;
for(let i = 0; i < numOfBoards; i++)
{
    createTargetBoard(70*i);
}
console.log("Done");

//end

////////////////////////////////////////////////////////////////////////////////////////////////////
//animation
////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Create the animation function");
let iFrame = 0;
function animate() 
{

    requestAnimationFrame(animate);

    controls.update();


    //put animation functions here


    //end of animation functions

   	renderer.render(scene, camera);
}
animate();
console.log("Done");