#include "pch.h"

namespace RayCad
{
	namespace Global
	{
		int sCircleSeg = 10;
		int sArcSeg = 10;
		set<int> sNonSegmentType{ Geom::G_ARC, Geom::G_ARC2, Geom::G_CIRCLE, Geom::G_CYLINDER, Geom::G_SPHERE, Geom::G_SPLINE };

		Matrix4 sUCSTr;
		Matrix4 sUCSTrInv;

		void SetGeom2DUCSTransform(Vector3 normal, Vector3 center)
		{
			sUCSTr.SetIdentity();
			sUCSTrInv.SetIdentity();

			//sUCSTr.SetFromAxes(pGeom->_ucx._x, pGeom->_ucx._y, pGeom->_ucx._z, pGeom->_ucy._x, pGeom->_ucy._y, pGeom->_ucy._z, 
			//	pGeom->_normal._x, pGeom->_normal._y, pGeom->_normal._z, pGeom->_ucOrigin._x, pGeom->_ucOrigin._y, pGeom->_ucOrigin._z);
			
			sUCSTr.SetRotateVectorFromTo(0, 0, 1, normal._x, normal._y, normal._z);

			shared_ptr<Matrix4> trs = make_shared<Matrix4>();
			trs->SetTranslate(-center._x, -center._y, -center._z);
			sUCSTr.Multiply(trs);

			sUCSTrInv.Clone(sUCSTr);
			sUCSTrInv.Inverse();
		}

		void UCSGlobalToLocal(double x, double y, double z, double& lx, double& ly, double& lz)
		{
			Vector4d p1(x, y, z, 1);
			Vector4d pp1 = sUCSTrInv._mat * p1;

			// local circle calc coord
			lx = pp1.x();
			ly = pp1.y();
			lz = pp1.z();
		}

		void UCSLocalToGlobal(double lx, double ly, double lz, double& x, double& y, double& z)
		{
			Vector4d lc(lx, ly, lz, 1);
			Vector4d gc = sUCSTr._mat * lc;
			x = gc.x();
			y = gc.y();
			z = gc.z();
		}
	}

}