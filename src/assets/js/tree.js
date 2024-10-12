var Tree = function (pId,  expandAll, jsonObj) {
	/* Attach Css */
    if (!document.getElementById('treeCss')) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('id', 'treeCss');
        link.setAttribute('href', 'assets/css/tree.css');
        document.getElementsByTagName('head')[0].appendChild(link);
    }
	/* End Attaching Css */

    var div = document.createElement('div');
    div.setAttribute('id', jsonObj['id']+pId);
    var h5 = document.createElement('h5');
    h5.innerHTML = jsonObj['label'];
    var treeBody = document.getElementById(pId);
    treeBody.appendChild(h5);
    treeBody.appendChild(div);

    this.expandAll = expandAll;
    this.jsonObj = jsonObj;
    this.pId = pId;
    this.jsonObj['ids'] = '0';
};

Tree.prototype.init = function () {
    document.getElementById(this.pId).style.display = 'none';
    this.updateTree(this.expandAll, this.jsonObj, false, function(parentId) {
      console.log("completed");
      setTimeout(function() {
        document.getElementById(parentId).style.display = 'block';
      },10);
    });
};

Tree.prototype.updateTree = function(expandAll, obj, showChecked, callBack) {
    var ulCheck = document.getElementById('ul'+obj['id']+this.pId);
  	if (ulCheck) {
  		return;
  	}

  	if (obj['childs'] == null) {
  		return;
  	}

  	var childArray = obj['childs'];

  	var ul = document.createElement('ul');
  	ul.setAttribute('aria-expanded', 'false');
  	ul.setAttribute('class', 'item');
  	ul.setAttribute('id', 'ul'+obj['id']+this.pId);

  	for (var i = 0; i < childArray.length; i++) {
  		var itemObj = childArray[i];
  		var id = itemObj['id'];
      var hasChilds = true;
      if (itemObj['childs'] == null) {
        hasChilds = false;
      }

  		var li = document.createElement('li');
  		li.setAttribute('role', 'treeitem');
  		li.setAttribute('class', 'liClass');
  		li.setAttribute('aria-expanded', 'false');
  		li.setAttribute('id', id+this.pId);

  		var label = document.createElement('label');
      label.setAttribute('id', 'label'+id+this.pId);
  		label.setAttribute('class', 'containerNoCheckbox');
  		label.innerHTML = itemObj['label'];

  		if (itemObj['checkbox']) {
  			label.setAttribute('class', 'container cLabel');
  			if (itemObj['disabled']) {
  				label.style.pointerEvents = 'none';
  			} else {
  				label.onclick = this.setCheckBoxClickHandler(id);
  			}

  			var input = document.createElement('input');
  			input.setAttribute('type', 'checkbox');
  			input.setAttribute('id', 'input-'+id+'-'+this.pId);
        input.setAttribute('value', hasChilds+'-'+id+'-'+obj['ids']+'-'+i);
        input.checked = itemObj['checked'] || showChecked;

  			var span = document.createElement('span');
  			span.setAttribute('class', 'checkmark');

  			label.appendChild(input);
  			label.appendChild(span);
  		} else {
        var div = document.createElement('div');
        div.setAttribute('id', 'input-'+id+'-'+this.pId);
        div.style.display = 'none';
        div.checked = showChecked;
        label.appendChild(div);
      }

  		/* Expand collapse */
  		var spanEC = document.createElement('span');
  		spanEC.setAttribute('class', 'folder');
  		spanEC.onclick = this.setClickHandler(itemObj);

  		/* Expand collapse icon */
  		var ico = document.createElement('i');
  		ico.setAttribute('class', 'fa fa-plus');
  		ico.setAttribute('id', 'i'+id+this.pId);

      if (this.expandAll) {
        li.setAttribute('aria-expanded', 'true');
        ico.setAttribute('class', 'fa fa-minus');
      }

      if (!hasChilds && !expandAll) {
        li.setAttribute('aria-expanded', 'true');
        ico.setAttribute('class', 'fa fa-minus');
      }

  		spanEC.appendChild(ico);
  		li.appendChild(label);
  		ul.appendChild(spanEC);
  		ul.appendChild(li);

      itemObj['ids'] = obj['ids']+'-'+i;

      if (expandAll) {
          document.getElementById(obj['id']+this.pId).appendChild(ul);
          //this.expand(itemObj);
          this.updateTree(this.expandAll, itemObj, false, function(pd) {});
      }
  	}
    if (!expandAll) {
        document.getElementById(obj['id']+this.pId).appendChild(ul);
    }

    callBack(this.pId);
};

Tree.prototype.setClickHandler = function(arg) {

  /* Commented below Code which is creating issue in IE11 */
  // return () => {
  //            this.expand(arg);
  // }
  //

  /* Added below code to fix the browser specific issue */
  return function() {
                  return this.expand(arg);
  }.bind(this);

  //

};


Tree.prototype.setCheckBoxClickHandler = function(arg) {

  /* Added below code to fix the browser specific issue */
  return function() {
                  return this.selectCheckBox(arg);
  }.bind(this);

  /* Commented below Code which is creating issue in IE11 */
  // return () => {
  //            this.selectCheckBox(arg);
  // }
};


Tree.prototype.selectCheckBox = function(item) {
	var node = document.getElementById('input-'+ item+'-'+this.pId);
	if (node['checked']) {
		node['checked'] = false;
		this.checkUncheckAllChild(item+this.pId, false);
	} else {
		node['checked'] = true;
		this.checkUncheckAllChild(item+this.pId, true);
	}
};

Tree.prototype.checkUncheckAllChild = function(id, check) {
	var el = document.getElementById(id);
	var inputAr = el.getElementsByTagName('input');
	for (var i = 0; i < inputAr.length; i++) {
		inputAr[i]['checked'] = check;
	}
};

Tree.prototype.expand = function(item) {
	var node = document.getElementById(item['id']+this.pId);
	if (node.getAttribute('aria-expanded') == 'true') {
		document.getElementById(item['id']+this.pId).setAttribute('aria-expanded', 'false');
		this.addRemovePlusClass(false, item['id']+this.pId);
	} else {
		document.getElementById(item['id']+this.pId).setAttribute('aria-expanded', 'true');
		this.addRemovePlusClass(true, item['id']+this.pId);
    var inputId = document.getElementById('input-'+ item['id']+'-'+this.pId);
    /*if (inputId['nodeName'] == 'DIV' || inputId['nodeName'] == 'div') {
      inputId['checked'] = true;
    }*/
    this.updateTree(this.expandAll, item, inputId['checked'], function(pd) {
      console.log("completed");
    });
	}
};

Tree.prototype.addRemovePlusClass = function(expand, id) {
	if (expand) {
		document.getElementById('i'+id).className = 'fa fa-minus';
	} else {
		document.getElementById('i'+id).className = 'fa fa-plus';
	}
};
