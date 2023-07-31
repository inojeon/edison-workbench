#include "pch.h"

namespace RayCad {

	Matrix4::Matrix4() {

		SetIdentity();
	}

	void Matrix4::SetIdentity() {
		_mat.setIdentity();
	}

	void Matrix4::SetRotateAngleAxis(double x, double y, double z, double angle, double ax, double ay, double az) {
		Eigen::Affine3d rot = Eigen::Affine3d(Eigen::AngleAxisd(angle, Eigen::Vector3d(ax, ay, az)));
		Eigen::Affine3d tr1(Eigen::Translation3d(Eigen::Vector3d(-x, -y, -z)));
		Eigen::Affine3d tr2(Eigen::Translation3d(Eigen::Vector3d(x, y, z)));

		_mat = (tr2 * rot * tr1).matrix(); // Option 1
	}


	void Matrix4::SetMirrorLine2D(double p1x, double p1y, double p2x, double p2y) {

		double tt = abs(p2x - p1x);
		if (tt < 0.000000001) {

			Eigen::Affine3d tr1(Eigen::Translation3d(Eigen::Vector3d(-p1x, 0, 0)));
			Eigen::Affine3d tr2(Eigen::Translation3d(Eigen::Vector3d(p1x, 0, 0)));

			Eigen::Matrix4d mat1;
			mat1.setIdentity();
			mat1(0, 0) = -1;

			_mat = tr2.matrix() * mat1 * tr1.matrix();

			return;
		}

		double m = (p2y - p1y) / (p2x - p1x);
		if (p1x > p2x)
		{
			m = (p1y - p2y) / (p1x - p2x);
		}

		double y0 = p1y - m * p1x;

		double mm = m * m;
		double _m = 1 / (1 + mm);


		Matrix4d mat1;
		mat1.setIdentity();
		mat1(0, 0) = (1 - mm) * _m;
		mat1(0, 1) = 2 * m * _m;
		mat1(1, 0) = 2 * m * _m;
		mat1(1, 1) = (mm-1) * _m;


		Eigen::Affine3d tr1(Eigen::Translation3d(Eigen::Vector3d(0, -y0, 0)));
		Eigen::Affine3d tr2(Eigen::Translation3d(Eigen::Vector3d(0, y0, 0)));

		_mat = tr2.matrix() * mat1 * tr1.matrix();
	}

	void Matrix4::SetMirrorPlane3D(double p1x, double p1y, double p1z, double nx, double ny, double nz)	{

		// tr1 : translate to origin (delim p1)
		Eigen::Affine3d tr1(Eigen::Translation3d(Eigen::Vector3d(-p1x, -p1y, -p1z)));

		// itr1 : inverse of tr1
		Eigen::Affine3d itr1(Eigen::Translation3d(Eigen::Vector3d(p1x, p1y, p1z)));

		// q, iq : axis-align normal to global Z.
		Eigen::Quaterniond q = Eigen::Quaterniond::FromTwoVectors(Eigen::Vector3d(nx, ny, nz), Eigen::Vector3d(0, 0, 1));
		Eigen::Matrix4d qm = Eigen::Matrix4d::Identity();
		qm.block(0, 0, 3, 3) = q.toRotationMatrix();
		Eigen::Quaterniond iq = Eigen::Quaterniond::FromTwoVectors(Eigen::Vector3d(0, 0, 1), Eigen::Vector3d(nx, ny, nz));
		Eigen::Matrix4d iqm = Eigen::Matrix4d::Identity();
		iqm.block(0, 0, 3, 3) = iq.toRotationMatrix();

		// reflection XY plane.
		Eigen::Matrix4d rfm;
		rfm.setIdentity();
		rfm(2, 2) = -1;

		_mat = itr1.matrix() * iqm * rfm * qm * tr1.matrix();
	}

	void Matrix4::SetMirrorPlane3P(double p1x, double p1y, double p1z, double p2x, double p2y, double p2z, double p3x, double p3y, double p3z) {
		Vector3 p1(p1x, p1y, p1z);
		Vector3 p2(p2x, p2y, p2z);
		Vector3 p3(p3x, p3y, p3z);
		Vector3 nv = (p2 - p1).Cross(p3 - p1);
		nv.Normalize();
		SetMirrorPlane3D(p1x, p1y, p1z, nv._x, nv._y, nv._z);
	}


	void Matrix4::SetTranslate(double x, double y, double z) {
		Eigen::Affine3d tr1(Eigen::Translation3d(Eigen::Vector3d(x, y, z)));
		_mat = tr1.matrix();
	}

	void Matrix4::Multiply(shared_ptr<Matrix4> mat) {

		_mat = _mat * mat->_mat;
	}

	void Matrix4::SetScale(double x, double y, double z) {
		Eigen::Affine3d tr1(Eigen::Scaling(Eigen::Vector3d(x, y, z)));

		_mat = tr1.matrix();
	}

	void Matrix4::SetFromAxes(double x1, double y1, double z1, double x2, double y2, double z2, double x3, double y3, double z3, double ox, double oy, double oz)
	{
		_mat.setIdentity();

		_mat(0, 0) = x1;
		_mat(1, 0) = y1;
		_mat(2, 0) = z1;

		_mat(0, 1) = x2;
		_mat(1, 1) = y2;
		_mat(2, 1) = z2;

		_mat(0, 2) = x3;
		_mat(1, 2) = y3;
		_mat(2, 2) = z3;

		_mat(0, 3) = ox;
		_mat(1, 3) = oy;
		_mat(2, 3) = oz;
	}

	void Matrix4::SetRotateVectorFromTo(double x1, double y1, double z1, double x2, double y2, double z2)
	{
		_mat.setIdentity();

		Eigen::Quaterniond q = Eigen::Quaterniond::FromTwoVectors(Eigen::Vector3d(x1, y1, z1), Eigen::Vector3d(x2, y2, z2));
		_mat.block(0, 0, 3, 3) = q.toRotationMatrix();
	}


	void Matrix4::Clone(Matrix4 m)
	{
		_mat = m._mat;
	}

	void Matrix4::Inverse()
	{
		Eigen::Matrix4d im = _mat.inverse();
		_mat.setZero();
		_mat = _mat + im;
	}


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_matrix4) {
		class_<RayCad::Matrix4>("Matrix4")
			.smart_ptr_constructor("Matrix4", &std::make_shared<Matrix4>)


			.function("SetIdentity", &RayCad::Matrix4::SetIdentity)
			.function("SetRotateAngleAxis", &RayCad::Matrix4::SetRotateAngleAxis)
			.function("SetMirrorLine2D", &RayCad::Matrix4::SetMirrorLine2D)
			.function("SetMirrorPlane3D", &RayCad::Matrix4::SetMirrorPlane3D)
			.function("SetMirrorPlane3P", &RayCad::Matrix4::SetMirrorPlane3P)
			.function("SetTranslate", &RayCad::Matrix4::SetTranslate)
			.function("SetScale", &RayCad::Matrix4::SetScale)

			;
	}
#endif


}