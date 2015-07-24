		var pathArray = new Array();
		var jsonMap = new Array();
		
		for( key = 0; key < jsonData.length; key++ )
		{
				var id = jsonData[key].Id;
				jsonMap[id] = key;
		}
		
		function pathAncestors( Id )
		{
			var key;
			for ( key = 0; key < jsonData.length; key++ )
			{
				if( jsonData[key].Id != Id ) { continue; }

				if( jsonData[key].Predecessor == '' ) 
				{ 
					var parent = new Array();
					parent.push( Id );
					return parent; 
				} else {
					var parent = pathAncestors( jsonData[key].Predecessor );
					parent.push( Id );
					return parent;
				}
			}
		}
		
		for ( i = 0; i < jsonData.length; i++ )
		{
			if ( pathArray.length == 0 ) 
			{
				pathArray[0] = Array( jsonData[i].Id );
			} else {
				var found = false;
				for( j = 0; j < pathArray.length; j++ )
				{
					var max = pathArray[j].length - 1;
					if( pathArray[j][max] != jsonData[i].Predecessor ) { continue; }
					found = true;
					pathArray[j].push( jsonData[i].Id );
				}
				
				if( found == true ) { continue; }
				pathArray.push( pathAncestors( jsonData[i].Id ) );
			}
		}