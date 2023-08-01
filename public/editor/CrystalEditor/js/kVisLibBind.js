//import { Mesh } from "../../build/three.module";


var kVisLib = {};
//RayWycobi._isReady = false;

kVisLib.api = {};
kVisLib.Init = function (func_ready) {

	var api = kVisLib.api;
	_initKVisLib().then(function (Module) {
		// this is reached when everything is ready, and you can call methods on Module
		api.Module = Module;
		api.LineSeg = Module.LineSeg;
		api.Geom = Module.Geom;
		api.Geom2D = Module.Geom2D;
		api.Group = Module.Group;
		api.EndGroup = Module.EndGroup;
		api.Point = Module.Point;
		api.PLine = Module.PLine;
		api.Spline = Module.Spline;
		api.Circle = Module.Circle;
		api.Sphere = Module.Sphere;
		api.Cylinder = Module.Cylinder;
		api.Mesh = Module.Mesh;
		api.Atom = Module.Atom;
		api.Arc = Module.Arc;
		api.Arc2 = Module.Arc2;
		api.Bond = Module.Bond;
		api.PointList = Module.PointList;
		api.CommandList = Module.CommandList;
		api.Polygon = Module.Polygon;
		api.KRF_Parser = Module.KRF_Parser;
		api.MemoryBlock = Module.MemoryBlock;
		api.ProteinTrajectory = Module.ProteinTrajectory;
		api.KRFTextParser = Module.KRFTextParser;
		api.BoundingBox2 = Module.BoundingBox2;
		api.Matrix4 = Module.Matrix4;
		api.Dim = Module.Dim;
		api.Material = Module.Material;
		api.ExtraData = Module.ExtraData;
		api._isReady = true;
		api.Util = Module.Util;

		api.IntersectLineCircle = Module.IntersectLineCircle;
		api.GetIntersectionPointList = Module.GetIntersectionPointList;
		
		api.UtilTest = function() {
			var mb = new api.MemoryBlock();
			mb.CreateWithString("this is sample string");
			var res = api.Module.SplitString(mb, api.Module.GetChar("s"));
			console.log(res);
		};
		
		api.test = function () {
			var g = new api.Group();
			var l1 = new api.LineSeg();
			var c1 = new api.Circle();
			var p1 = new api.PointList();
			var a1 = new api.Point();
			var pl1 = new api.PLine();
			var sp1 = new api.Spline();
			var m1 = new api.Mesh();
			var arc1 = new api.Arc();
			var cl1 = new api.CommandList();
			var cl2 = new api.CommandList();

			var mb = new api.MemoryBlock();
			mb.Create(100);
			var ptr = mb.GetPointer();
			ptr[0] = 1;
			ptr[10] = 2;


			l1.Set(1, 1, 4, 30, 23, 32);
			//console.log(" line to point = " + l1.distance3(11, 20, 100)); // 왠지 모르겠으나 오류 발생

			var i1 = g.Add(l1);
			var l2 = g.Get(i1);

			l1.Set(120, 0, 32, 100, 32, 0);

			//console.log(" line1 to point = " + l1.distance3(11, 20, 100));
			//console.log(" line2 to point = " + l2.distance3(11, 20, 100));
			var l3 = l2.clone();
			//console.log(" line2 to command = " + l2.ToCommand());
			//console.log(" clone line3 tocommand = " + l3.ToCommand());
			
			console.log("");
			c1.Set(30,30,30,5);
			var c2 = c1.clone();

			console.log(" circle1 to point 2d = " + c1.distance2(100,50));
			console.log(" circle1 typename = " + c1.GetTypeName());
			console.log(" circle1 tocommand = " + c1.ToCommand());
			
			console.log(" clone circle2 tocommand = " + c2.ToCommand());
			c2.Set(10,10,10,3);
			console.log(" circle2 tocommand (after c2.Set(10,10,10,3)) = " + c2.ToCommand());

			p1.Init(3);
			p1.SetPoint(0, 1,1,1);
			p1.SetPoint(1, 3,3,3);
			p1.SetPoint(2, 100,100,100);

			console.log(" pointList1 to point 2d = " + p1.distance2(0,0));
			console.log(" pointList1 to command = " + p1.ToCommand());
			console.log(" get number of points = " + p1.GetNumberOfPoints());
			var p2 = p1.clone();
			console.log(" clone pointList3 tocommand = " + p2.ToCommand());
			console.log("");

			a1.Set(10, 15, 20);

			console.log(" point1 to point 2d = " + a1.distance2(0,0));
			//console.log(" point1 to point 3d = " + a1.distance3(30,40,50));
			console.log(" point1 GetTypeName = " + a1.GetTypeName());
			console.log(" point1 ToCammand = " + a1.ToCommand());
			var a2 = a1.clone();
			console.log(" clone point ToCommand = " + a2.ToCommand());

			
			console.log("");

			pl1.Init(5);
			pl1.SetPoint(0,1,2,3);
			pl1.SetPoint(1,2,3,4);
			pl1.SetPoint(2,3,4,5);
			pl1.SetPoint(3,4,5,6);
			pl1.SetPoint(4, 7, 8, 9);

			pl1.AddPoint(1, 2, 3);

			console.log(" polyline1 ToCommand = " +pl1.ToCommand());
			
			console.log("");

			sp1.Init(5);
			sp1.SetPoint(0,0,0,0);
			sp1.SetPoint(1,3,5,8);
			sp1.SetPoint(2,43,2,12);
			sp1.SetPoint(3,65,7,0);
			sp1.SetPoint(4,3,2,5);
			console.log(" spline1 ToCommand = " + sp1.ToCommand());

			console.log("");
			
			console.log(" dist line seg to point 2d = " + api.Dist.DistLinesegPoint2(1,2,3,4,50,308));
			
			console.log("");
			
			g.Add(l1);
			g.Add(c1);
			g.Add(p1);
			g.Add(a1);
			console.log(" dist group to point 2d = " + g.distance2(9999, 9999));
			console.log(" group type name = " + g.GetTypeName());

			console.log("");
			
			m1.Init(3,3);
			m1.SetVertex(0, 1,2,3);
			m1.SetVertex(1, 1.3, 3.5, 6.9);
			m1.SetVertex(2, 4.5, 5.6, 6.78);
			m1.SetTri(0, 0, 1, 2);
			m1.SetTri(1, 1,2,3);
			m1.SetTri(2, 2,3,4);

			console.log(" mesh tocommand = " + m1.ToCommand());
			
			console.log("");

			arc1.Set(1,2,3,4,0.3,0.2);
			console.log(" arc tocommand = " + arc1.ToCommand());
			console.log("");
			
			cl1.Add(a1.ToCommand());
			cl1.Add(c1.ToCommand());
			cl1.Add(p1.ToCommand());
			//cl1.Add(l1.ToCommand()); 에러 발생
			console.log(" commandlist = ");
			console.log(cl1.GetCommandString(0));
			console.log(cl1.GetCommandString(1));
			console.log(cl1.GetCommandString(2));
			console.log(cl1.GetCommandString(3));

			
			var cmd =
				"LineSeg,0,0,0,10,0,0,0\n" +
				"LineSeg,1,0,0,10,0,10,0\n"
				;
						
			cl2.LoadFromString(cmd);
		
			console.log(" cl2 LoadFromString = " + cl2.GetNumberOfCommands());
		
			var cmd1 = cl2.GetCommand(1);
			console.log(" cl2 cmd = " + cmd1.GetTypeName());
			//console.log(" cl2 param = " + cmd1.ToCommand());



			// 상속 메소드 테스트
			console.log(a1.GetTypeName());
			console.log(a1.GetType());
			console.log(a1.GetID());
			//console.log(a1.GetMaterial()); // 에러 발생
			
			console.log(g.GetTypeName());
			console.log(l1.GetTypeName());
			console.log(c1.GetTypeName());
			console.log(pl1.GetTypeName());
			console.log(m1.GetTypeName());
			console.log(arc1.GetTypeName());
			console.log(p1.GetTypeName());

			console.log(a1.GetType());
			console.log(g.GetType());
			console.log(l1.GetType());
			console.log(c1.GetType());
			console.log(pl1.GetType());
			console.log(m1.GetType());
			console.log(arc1.GetType());
			console.log(p1.GetType());

			console.log(a1.GetID());
			console.log(g.GetID());
			console.log(l1.GetID());
			console.log(c1.GetID());
			console.log(pl1.GetID());
			console.log(m1.GetID());
			console.log(arc1.GetID());
			console.log(p1.GetID());

			console.log(a1.ToCommand());
			console.log(g.ToCommand());
			console.log(l1.ToCommand());
			console.log(c1.ToCommand());
			console.log(pl1.ToCommand());
			console.log(m1.ToCommand());
			console.log(arc1.ToCommand());
			console.log(p1.ToCommand());


			//KRF_Parser 테스트
			/*
			아래의 내용을 실행하여 에러가 발생하고, 다음 번에 html 디버그 창에
			복붙하여 실행하면 돌아간다.
			var poly = new kVisLib.api.Polygon();
			poly.SetID(0);
			poly.Init(2);
			poly.SetPoint(0,1,2,3);
			poly.SetPoint(1,2,3,4);

			var point = new kVisLib.api.Point();
			point.SetID(1);
			point.Set(1,2,3);

			var parser = new kVisLib.api.KRF_Parser();

			console.log(parser.AddBinaryWithGeom(poly));
			console.log(parser.AddBinaryWithGeom(point));
			console.log(parser.GetGeomFromData(0).ToCommand());
			console.log(parser.GetGeomFromData(1).ToCommand());
			*/
			
		};


		if (func_ready) {
			func_ready();
		}

	});



};

