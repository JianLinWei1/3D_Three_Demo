    var scene = new THREE.Scene();
 
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 100, 200, 300 );
    var controls = new THREE.OrbitControls( camera );
    controls.target.set( 0, 100, 0 );
    controls.update();
 
 
    var renderer = new THREE.WebGLRenderer();
 
    renderer.setSize(window.innerWidth, window.innerHeight);
 
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
 
 
 
   var  light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    light.position.set( 0, 200, 0 );
    scene.add( light );
 
    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 200, 100 );
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = - 100;
    light.shadow.camera.left = - 120;
    light.shadow.camera.right = 120;
    scene.add( light );
 
    var loader = new THREE.OBJLoader();
    loader.load( 'js/three/demo.obj', function ( object ) {
 
        mixer = new THREE.AnimationMixer(object);
 
        var action = mixer.clipAction(object.animations[0]);
        action.play();
 
        object.traverse(function (child) {
 
            if (child.isMesh) {
 
                child.castShadow = true;
                child.receiveShadow = true;
 
            }
 
        });
 
        scene.add( object );
 
    } );
 
 
    function render() {
        requestAnimationFrame(render);
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        renderer.render(scene, camera);
    }
    render();