import React, { Component } from "react";
import ReactDOM from "react-dom";
import jexcel from "jexcel";

import "./styles.css";
import "../../../node_modules/jexcel/dist/jexcel.css";

class ColumnsTable extends React.Component {
    constructor(props) {
        super(props);
        var data = [
            ['Username', 'V_String', true, true,''],
            ['Firstname', 'V_String', false, true,''],
            ['Email', 'V_String', false, true,''],
            ['Phone', 'V_String', false, true,''],
            ['Password', 'V_String', false, true,''],
        ];
        this.options = {
        data:data,
        columns: [
            { type: 'text', title:'Column Name', width:120 },
            { type: 'dropdown', title:'Type', width:200, source:[ "W_String", "V_String", "Integer","Double", "Float",, "Boolean", "Timestamp",  "Date"] },
            { type: 'checkbox', title:'Unique', width:80 },
            { type: 'checkbox', title:'Required', width:80 },
            { type: 'text', title:'Default', width:100 },
         ],
        onchange: this.changed,
        columnDrag:true,
        allowManualInsertRow: false,
        persistance: '/jexcel/v4/save',
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
        this.el = jexcel(ReactDOM.findDOMNode(this).children[1], this.options);

    }

    addRow = function() {
        this.el.insertRow([ '', 'V_String', false, true,'']);
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
       
          console.log(x + ' ' + y);

          if(cellName.includes('A')){
              console.log("save to database");
          }
    }

    render() {
        return (
            <div>
                <div>
                <input type='button' value='Add new Column' onClick={() => this.addRow()}></input>
                <input type='button' value='Save columns' onClick={() => this.saveFields()}></input>
                </div>
                
                <div></div><br/><br/>
            </div>
        );
    }
}

export default ColumnsTable;