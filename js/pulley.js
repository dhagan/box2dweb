function init() {
	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var b2AABB = Box2D.Collision.b2AABB;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2JointDef = Box2D.Dynamics.b2JointDef;
    var b2Body = Box2D.Dynamics.b2Body;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2Fixture = Box2D.Dynamics.b2Fixture;
	var b2World = Box2D.Dynamics.b2World;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
     
	var worldScale = 30;
	
	var world = new b2World(new b2Vec2(0, 10),true);
	
	var canvasPosition = getElementPosition(document.getElementById("canvas"));
	
	debugDraw();             
	window.setInterval(update,1000/60);
	
	createBox(640,30,320,480,b2Body.b2_staticBody);
	createBox(640,30,320,0,b2Body.b2_staticBody);
	createBox(30,480,0,240,b2Body.b2_staticBody);
	createBox(30,480,640,240,b2Body.b2_staticBody);

    function initPulley() {
        var b1 = createBox(10,10,100,100,b2Body.b2_staticBody);
        var b2 = createBox(10,10,200,200,b2Body.b2_staticBody);
        //sim.addJoint({type:"pulley", a:boxA.body, b:boxB.body, groundAnchor1:new b2Vec2(boxA.x, 2), groundAnchor2:new b2Vec2(boxB.x, 2)});
        //var body2Joint = new b2JointDef(b1, b2, true, )
        // http://kyucon.com/doc/box2d/Box2D/Dynamics/Joints/b2PulleyJointDef.html
        // what you need to do is clone this code as a starting poitn
        // http://buildnewgames.com/assets/article//box2dweb/example6.html
        //
        world.CreateJoint(a);
    }


	document.addEventListener("mousedown",function(e){
		createBox(Math.random()*40+40,Math.random()*40+40,e.clientX-canvasPosition.x,e.clientY-canvasPosition.y,b2Body.b2_dynamicBody);
	});
	
	function createBox(width,height,pX,pY,type){
		var bodyDef = new b2BodyDef;
		bodyDef.type = type;
		bodyDef.position.Set(pX/worldScale,pY/worldScale);
		var polygonShape = new b2PolygonShape;
		polygonShape.SetAsBox(width/2/worldScale,height/2/worldScale);
		var fixtureDef = new b2FixtureDef;
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.5;
		fixtureDef.restitution = 0.5;
		fixtureDef.shape = polygonShape;
		var body=world.CreateBody(bodyDef);
		body.CreateFixture(fixtureDef);
        return body;
	}
	
	function debugDraw(){
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		debugDraw.SetDrawScale(30.0);
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);
	}
	
	function update() { 
		world.Step(1/60,10,10);
	     world.DrawDebugData();
	     world.ClearForces();
	};
	
	//http://js-tut.aardon.de/js-tut/tutorial/position.html
	function getElementPosition(element) {
		var elem=element, tagname="", x=0, y=0;
		while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
			y += elem.offsetTop;
			x += elem.offsetLeft;
			tagname = elem.tagName.toUpperCase();
			if(tagname == "BODY"){
				elem=0;
			}
			if(typeof(elem) == "object"){
				if(typeof(elem.offsetParent) == "object"){
					elem = elem.offsetParent;
				}
			}
		}
		return {x: x, y: y};
	}

};        