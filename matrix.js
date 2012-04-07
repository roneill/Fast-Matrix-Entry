
 var currCol = 1;
      var currRow = 1;
      
      function addColumn() {
        $('tr').append('<td id=c'+currCol+'><input type="text"></td>');
        currCol++;
      }

      function addRow() {
      var s = "<td id=c0></td>";
      
      for (var i = 1; i< currCol; i++) {
        s = s + '<td id=c'+i+'></td>';
      }
			
        $('table').append('<tr id=r'+currRow+'>'+s+'</tr>');

        $('#r' + currRow + ' > td').append('<input type="text">');

	currRow++;
      }
						     
      function removeColumn() {

	for (var i = 0; i < currRow; i++) {
	  var selector = "#r"+i + "> #c"+(currCol-1);
          $(selector).remove();
	}
	currCol--;
      }

      function removeRow() {
        $('tr:last').remove();
	currRow--;
      }

      function createTable(n) {

 	var table = [];
	for (var i = 0; i < currRow; i++) {
	  table.push([]);
	}

	return table;
      }
			    
      function updateString() {

        var table = createTable(currRow);
			    
        for (var i = 0; i < currRow; i++) {
          for (var j = 0; j < currCol; j++) {
	    var selector = "#r"+i + "> #c"+j + " > input";
	    var value = $(selector).val();

            if (typeof value === "undefined") {
              value = "";
	    }
		
	    table[i][j] = value;
	  }
	}

        var output = "{";
			      
        for (var i = 0; i < currRow; i++) {
	  output = output + "{";
          for (var j = 0; j < currCol; j++) {
	    var value = table[i][j];

	    output = output + value;

	    if (j + 1 < currCol) {
              output = output + ",";  
	    }
	  }

          output = output + "}";

	  if (i + 1 < currRow) {
              output = output + ",";  
	    }
	}
			    
        $('#output').text(output + "}");
      }

function computeTableSize(e, ui) {
    var width = Math.round(ui.size.width / 38) ;
    var height = Math.round(ui.size.height / 38);

    console.log(width);
    console.log(height);
    console.log(ui);

    
    if (currCol < width) {	      
        while (currCol < width) {
	    addColumn();
	    console.log("Adding column");
        }
    }
    
    else if (currCol === width) { }
    else {
	while (currCol > width) {
	    removeColumn();
        }	  
    }
    
    if (currRow < height) {	      
        while (currRow < height) {
	    addRow();
        }
    }
    else if (currRow === height) { }
    else {
	while (currRow > height) {
            removeRow();
        }	  
    }
}

function initializeTable() {
    addRow();
    addColumn();
}

function initialize() {
    $(document).keyup(handleKeyPress);

    $(function() {
	  $( "#resizable" ).draggable().resizable();
      });

    $('#resizable')
	.resizable({
		       start: function(e, ui) {
		       },
		       resize: function(e, ui) {
			   computeTableSize(e, ui);
		       },
		       stop: function(e, ui) {
		       }
		   });

    initializeTable();
}

function moveRight() {
    var focused = document.activeElement;
    var parent = focused.parent;
    console.log(parent);		 
}					 
function moveLeft() {			 
    var focused = document.activeElement;
    var parent = focused.parent;
    console.log(parent);		 
}					 
function moveDown() {			 
    var focused = document.activeElement;
    var parent = focused.parent;
    console.log(parent);		 
}					 
function moveUp() {			 
    var focused = document.activeElement;
    var parent = focused.parent;
    console.log(parent);
}

function handleKeyPress(e) {

        
        if (e.which === 39)
          moveRight();
        
        if (e.which === 37)
	    moveLeft();
	
        if (e.which === 40)
	    moveDown();
	
        if (e.which === 38)
	    moveUp();
	 
	 
	updateString();
      }

      $(initialize);