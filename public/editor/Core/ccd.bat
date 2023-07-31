set EMCC_DEBUG=0
emcc  --bind -s ALLOW_MEMORY_GROWTH=1  ^
distance.cpp Global.cpp Geom.cpp Group.cpp Circle.cpp  LineSeg.cpp ^
Arc2.cpp Arc.cpp Cylinder.cpp Sphere.cpp Point.cpp  PointList.cpp PLine.cpp Spline.cpp Mesh.cpp Polygon.cpp ^
Material.cpp Vector3.cpp CString.cpp CommandList.cpp KRFBinaryParser.cpp KRFTextParser.cpp Tag.cpp Util.cpp ^
MemoryBlock.cpp ProteinTrajectory.cpp BoundingBox2.cpp Intersect.cpp BSpline.cpp Matrix4.cpp Font.cpp Dim.cpp ^
Atom.cpp Bond.cpp ExtraData.cpp DnaArm.cpp ^
-s MODULARIZE=1 -s EXPORT_NAME="'_initKVisLib'"   -o0 -o ./jsbuild/kVisLib.js ^
-I../
::emcc --bind distance.cpp -o distance.html -s "EXPORTED_FUNCTIONS=['DistLinesegPoint2', 'DistLinesegPoint3', 'DistPointPoint2', 'DistPointPoint3', 'DistPointCircle2', 'DistPointSphere3', 'DistPointRectangle2']" -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']"
::emcc --bind distance.cpp -o ./jsbuild/distance.js^
::emcc distance.cpp -s "EXPORTED_FUNCTIONS=['_DistLinesegPoint2']" -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']"^