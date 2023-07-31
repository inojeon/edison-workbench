set EMCC_DEBUG=0
emcc  --bind -s ALLOW_MEMORY_GROWTH=1   ^
distance.cpp Global.cpp Geom.cpp Group.cpp Circle.cpp  LineSeg.cpp ^
Arc2.cpp Arc.cpp Cylinder.cpp Sphere.cpp Point.cpp  PointList.cpp PLine.cpp Spline.cpp Mesh.cpp Polygon.cpp ^
Material.cpp Vector3.cpp CString.cpp CommandList.cpp KRFBinaryParser.cpp KRFTextParser.cpp Tag.cpp Util.cpp ^
MemoryBlock.cpp ProteinTrajectory.cpp BoundingBox2.cpp Intersect.cpp BSpline.cpp Matrix4.cpp Font.cpp Dim.cpp ^
Atom.cpp Bond.cpp  ExtraData.cpp DnaArm.cpp ^
-s MODULARIZE=1 -s EXPORT_NAME="'_initKVisLib'"   -o3 -o ./jsbuild/kVisLib.js ^
-I../