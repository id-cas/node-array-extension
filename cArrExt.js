/**
 * Расширения для работы массивов
 */



Array.prototype.min = function() {
	/** Максимальное значение в массиве **/
	return this.reduce(function (p, v) {
		return ( p < v ? p : v );
	});
};

Array.prototype.max = function() {
	/** Максимальное значение в массиве **/
	return this.reduce(function (p, v) {
		return ( p > v ? p : v );
	});
};

Array.prototype.round = function(precision) {
	/** Округление **/
	for (var i = 0; i < this.length; i++){
		this[i] = Number(this[i].toFixed(precision));
	}

	return this;
};

Array.prototype.sortNum = function() {
	/** Сортировка чисел в массиве "по возрастанию" **/
	var sortNumber = function (a, b) { return a - b; };

	return this.sort(sortNumber);
};


Array.prototype.rotate = function(n) {
	/** Карусель **/
	var len = this.length;
	return !(n % len) ? this.slice()
		: this.map((e,i,a) => a[(i + (len + n % len)) % len]);
};

Array.prototype.diff = function(a) {
	/** Разница **/
	return this.filter(function(i) {return a.indexOf(i) < 0;});
};

Array.prototype.intersect = function(a) {
	/** Пересечение **/
	let intersected = this.filter(x => a.includes(x));
	return intersected;
};

Array.prototype.compare = function(a) {
	/** Сравнение **/
	// Сравнивает два массива, если даже один "провернут" относительно другого
	// array1 = [2,3,1,4];
	// array2 = [1,2,3,4];
	// вернет true

	if(this.length !== a.length) return false;
	var total = a.length;

	var offset = 0;
	var equalCount = 0;

	while(offset < total){

		a = a.rotate(offset);
		equalCount = 0;

		for(var i = 0; i < total; i++){
			if(this[i] === a[i]){
				equalCount++;
			}
		}

		if(equalCount === total) return true;
		offset++;
	}

	return false;
};


Array.prototype.hasEqualItems = function(a) {
	/** Сравнение **/
	// Сравнивает два массива, если даже (в разброс одинаковые элементы)
	// array1 = [2,1,3,4];
	// array2 = [1,2,3,4];
	// вернет true

	if(this.length !== a.length) return false;

	var total = a.length;
	var equalCount = 0;
	for(var i = 0; i < total; i++){
		if(this.indexOf(a[i]) > -1){
			equalCount++;
		}
	}

	if(equalCount === total) return true;

	return false;
};


Array.prototype.distinct = function (){
	/** Уникальные значения **/
	// Возвращает только уникальные значения массив
	// [1, 1, 2, 3, 4, 3] -> [1, 2, 3, 4]

	var a = [];
	for (var i = 0, l = this.length; i < l; i++){
		if (a.indexOf(this[i]) === -1 && this[i] !== ''){
			a.push(this[i]);
		}
	}

	return a;
};


Array.prototype.sameValues = function (){
	/** Все элементы одинаковые **/
	return this.every((v, i, a) => v === a[0]);
};



/** Снипетт для работы с трехмерным массивом **/
exports.Array3D = Array3D;

function Array3D() {
	this.array3d = {};
}

Array3D.prototype.setVal = function(a, b, val){
	if(typeof this.array3d[a] === 'undefined') this.array3d[a] = {};
	this.array3d[a][b] = val;
}

Array3D.prototype.getVal = function(a, b){
	return this.array3d[a][b];
}

Array3D.prototype.get = function(){
	return this.array3d;
}

Array3D.prototype.getTable4Excel = function(){
	/**
	 * Возвращает данные в виде таблицы для переноса данных в Excel с последующей визуализацией
	 */
	var strTblHdr = '', strTbl = '', separator = ';', newLine = '\n';

	var a = 0, b = 0, val = 0;

	var keysA = Object.keys(this.array3d);
	var keysB = [];

	strTblHdr += separator;
	for(var i = 0; i < keysA.length; i++){
		a = keysA[i];
		keysB = Object.keys(this.array3d[a]);

		strTbl += (a + separator);
		for(var j = 0; j < keysB.length; j++){
			b = keysB[j];
			val = this.array3d[a][b];

			strTbl += (val + separator);
			if(i === 0) {
				strTblHdr += (b + separator);
			}
		}
		strTbl += newLine;
	}

	strTblHdr += newLine;

	return strTblHdr + strTbl;
}

