import React, { Component } from "react";
import ReactDOM from "react-dom";
import jexcel from "jexcel";

import "./styles.css";
import "../../../node_modules/jexcel/dist/jexcel.css";

class RowsTable extends React.Component {
    constructor(props) {
        super(props);
        var data = [
            ['sb', 'Michael', "mike@zmc.co.ke", "+25412342121",'#passw0rd']
        ];
        this.options = {
        data:data,
        columns: [
            { type: 'text', title:'Username', width:120 },
            { type: 'text', title:'Firstname', width:200},
            { type: 'text', title:'Email', width:120 },
            { type: 'text', title:'Phone', width:120 },
            { type: 'text', title:'password', width:120 },
         ],
        onchange: this.changed,
        columnDrag:true,
        allowManualInsertRow: false,
        // onbeforechange: beforeChange,
        oninsertrow: this.insertedRow,
        // oninsertcolumn: insertedColumn,
        // ondeleterow: deletedRow,
        // ondeletecolumn: deletedColumn,
        // onselection: selectionActive,
        // onsort: sort,
        // onresizerow: resizeRow,
        // onresizecolumn: resizeColumn,
        // onmoverow: moveRow,
        // onmovecolumn: moveColumn,
        // onload: loaded,
        // onblur: blur,
        // onfocus: focus,
        // onpaste: paste,
        // toolbar:[
        //   {
        //       type: 'i',
        //       content: 'undo',
        //       onclick: function() {
        //          // table.undo();
        //       }
        //   },
        //   {
        //       type: 'i',
        //       content: 'redo',
        //       onclick: function() {
        //          // table.redo();
        //       }
        //   },
        // ]
        };
    }

    componentDidMount = function() {
        this.el = jexcel(ReactDOM.findDOMNode(this).children[0], this.options);

    }

    addRow = function() {
        this.el.insertRow([ '', '', '', '','']);
       console.log( this.el.getRowData(0));
    }
    saveFields = function() {
        
       console.log( this.el.getData());
    }

    insertedRow = function(instance) {
        console.log(instance);  
      }

    changed = function(instance, cell, x, y, value) {

          var cellName = jexcel.getColumnNameFromId([x,y]);

          if(cellName.includes('A')){
              console.log("save to database");
          }
    }

    render() {
        return (
            <div>
                <div></div><br/><br/>

                <div>
                <input type='button' value='Add new Row' onClick={() => this.addRow()}></input>
                </div>
                
            </div>
        );
    }
}

export default RowsTable;