#include "pch.h"

namespace RayCad {
	BoundingBox2::BoundingBox2()
	{
		_maxCoord._x = -1e9;
		_maxCoord._y = -1e9;
		_maxCoord._z = -1e9;

		_minCoord._x = 1e9;
		_minCoord._y = 1e9;
		_minCoord._z = 1e9;

		_notDefined = true;
	}
	BoundingBox2::~BoundingBox2()
	{
	}
	void BoundingBox2::Reset()
	{
		_maxCoord._x = -1e9;
		_maxCoord._y = -1e9;
		_maxCoord._z = -1e9;

		_minCoord._x = 1e9;
		_minCoord._y = 1e9;
		_minCoord._z = 1e9;

		_notDefined = true;
	}

	void BoundingBox2::Add(cad_type x, cad_type y, cad_type z)
	{
		if (_notDefined)
			_notDefined = false;

		if (_minCoord._x > x)
			_minCoord._x = x;
		if (_minCoord._y > y)
			_minCoord._y = y;
		if (_minCoord._z > z)
			_minCoord._z = z;

		if (_maxCoord._x < x)
			_maxCoord._x = x;
		if (_maxCoord._y < y)
			_maxCoord._y = y;
		if (_maxCoord._z < z)
			_maxCoord._z = z;

	}

	void BoundingBox2::Add(shared_ptr<BoundingBox2> bbox)
	{
		double smallX, smallY, smallZ, bigX, bigY, bigZ;
		smallX = bbox->_minCoord._x;
		smallY = bbox->_minCoord._y;
		smallZ = bbox->_minCoord._z;
		bigX = bbox->_maxCoord._x;
		bigY = bbox->_maxCoord._y;
		bigZ = bbox->_maxCoord._z;

		if (_minCoord._x > smallX)
			_minCoord._x = smallX;
		
		if (_minCoord._y > smallY)
			_minCoord._y = smallY;

		if (_minCoord._z > smallZ)
			_minCoord._z = smallZ;

		if (_maxCoord._z < bigZ)
			_maxCoord._z = bigZ;

		if (_maxCoord._y < bigY)
			_maxCoord._y = bigY;

		if (_maxCoord._x < bigX)
			_maxCoord._x = bigX;
	}

	bool BoundingBox2::IsIntersect(shared_ptr<BoundingBox2> bbox)
	{
		if (this->_notDefined || bbox->_notDefined)
			return false;

		//double	smallX	= bbox->_minCoord._x, 
		//		smallY	= bbox->_minCoord._y, 
		//		bigX	= bbox->_maxCoord._x, 
		//		bigY	= bbox->_maxCoord._y;
		
		if (IsContain(bbox))
			return true;


		if ((this->_minCoord._x <= bbox->_maxCoord._x && this->_maxCoord._x >= bbox->_minCoord._x) &&
			(this->_minCoord._y <= bbox->_maxCoord._y && this->_maxCoord._y >= bbox->_minCoord._y) &&
			(this->_minCoord._z <= bbox->_maxCoord._z && this->_maxCoord._z >= bbox->_minCoord._z))
			return true;

		/*
		wykobi::segment<double, 2> s1[4], s2[4];
		s1[0][1] = s1[1][0] = { smallX, bigY };
		s1[1][1] = s1[2][0] = { bigX, bigY };
		s1[2][1] = s1[3][0] = { bigX, smallY };
		s1[3][1] = s1[0][0] = { smallX, smallY };

		s2[0][1] = s2[1][0] = { _minCoord._x, _maxCoord._y };
		s2[1][1] = s2[2][0] = { _maxCoord._x, _maxCoord._y };
		s2[2][1] = s2[3][0] = { _maxCoord._x, _minCoord._y };
		s2[3][1] = s2[0][0] = { _minCoord._x, _minCoord._y };

		for (int i = 0; i < 4; i++) {
			for (int j = 0; j < 4; j++) {
				if (wykobi::intersect(s1[i], s2[j]))
					return true;
			}
		}
		*/

		/*
		if (_minCoord._x <= smallX && smallX <= _maxCoord._x)
		{
			if (_minCoord._y <= smallY && smallY <= _maxCoord._y) 
				return true;
			
			else if (_minCoord._y <= bigY && bigY <= _maxCoord._y) 
				return true;
			
		}
		if (_minCoord._x <= bigX && bigX <= _maxCoord._x)
		{
			if (_minCoord._y <= smallY && smallY <= _maxCoord._y) 
				return true;
			
			else if (_minCoord._y <= bigY && bigY <= _maxCoord._y) 
				return true;
			
		}

		if (smallX <= _minCoord._x && _minCoord._x <= bigX) 
		{
			if (smallY <= _minCoord._y && _minCoord._y <= bigY)
				return true;

			else if (smallY <= _maxCoord._y && _maxCoord._y <= bigY)
				return true;
		}

		if (smallX <= _maxCoord._x && _maxCoord._x <= bigX)
		{
			if (smallY <= _minCoord._y && _minCoord._y <= bigY)
				return true;

			else if (smallY <= _maxCoord._y && _maxCoord._y <= bigY)
				return true;
		}
		*/

		return false;
	}

	shared_ptr<BoundingBox2> BoundingBox2::Clone()
	{
		shared_ptr<BoundingBox2> clonedBox = make_shared<BoundingBox2>();
		
		clonedBox->_notDefined = _notDefined;
		clonedBox->_minCoord.Set(_minCoord);
		clonedBox->_maxCoord.Set(_maxCoord);

		return clonedBox;
	}

	void BoundingBox2::Enlarge(double dx, double dy, double dz)
	{
		if (_notDefined)
			return;

		_minCoord._x -= dx;
		_minCoord._y -= dy;
		_minCoord._z -= dz;
		_maxCoord._x += dx;
		_maxCoord._y += dy;
		_maxCoord._z += dz;

		if (_minCoord._x > _maxCoord._x)
			_minCoord._x = _maxCoord._x = 0;
		if (_maxCoord._y < _minCoord._y)
			_minCoord._y = _maxCoord._y = 0;
		if (_maxCoord._z < _minCoord._z)
			_minCoord._z = _maxCoord._z = 0;
	}

	void BoundingBox2::CopyFrom(shared_ptr<BoundingBox2> src)
	{
		if (src->_notDefined)
		{
			_notDefined = true;
			return;
		}
		else
		{
			_notDefined = src->_notDefined;
			_minCoord.Set(src->_minCoord);
			_maxCoord.Set(src->_maxCoord);
		}
	}

	bool BoundingBox2::IsContain(shared_ptr<BoundingBox2> bbox)
	{
		if (bbox->_notDefined || this->_notDefined)
			return false;

		bool bContain = false;
		double	smallX = bbox->_minCoord._x,
			smallY = bbox->_minCoord._y,
			smallZ = bbox->_minCoord._z,
			bigX = bbox->_maxCoord._x,
			bigY = bbox->_maxCoord._y,
			bigZ = bbox->_maxCoord._z;

		if (_minCoord._x <= smallX && bigX <= _maxCoord._x
			&& _minCoord._y <= smallY && bigY <= _maxCoord._y
			&& _minCoord._z <= smallZ && bigZ <= _maxCoord._z)
			bContain = true;

		return bContain;
	}

	string BoundingBox2::toString()
	{
		return "minCoord(" + to_string(_minCoord._x) + "," + to_string(_minCoord._y) + "," + to_string(_minCoord._z) + ") maxCoord ("+ to_string(_maxCoord._x) +"," + to_string(_maxCoord._y) + "," + to_string(_maxCoord._z) + ")\n";
	}

#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_boundingbox2) {
		class_<BoundingBox2>("BoundingBox2")
			.smart_ptr_constructor("BoundingBox2", &std::make_shared<BoundingBox2>)

			.function("Reset", &RayCad::BoundingBox2::Reset)
			.function("Add", select_overload<void(cad_type, cad_type, cad_type)>(&RayCad::BoundingBox2::Add))
			.function("Add", select_overload<void(shared_ptr<BoundingBox2>)>(&RayCad::BoundingBox2::Add))
			.function("IsIntersect", &RayCad::BoundingBox2::IsIntersect)
			.function("Clone", &RayCad::BoundingBox2::Clone)
			.function("Enlarge", &RayCad::BoundingBox2::Enlarge)
			.function("CopyFrom", &RayCad::BoundingBox2::CopyFrom)
			.function("IsContain", &RayCad::BoundingBox2::IsContain)
			.function("toString", &RayCad::BoundingBox2::toString);
	}

#endif
}