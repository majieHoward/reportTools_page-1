/*
jQWidgets v4.1.2 (2016-Apr)
Copyright (c) 2011-2016 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a) {
    a.extend(a.jqx._jqxGrid.prototype, {
        exportdata: function(s, B, A, q, t, v, h) {
            if (!a.jqx.dataAdapter.ArrayExporter) {
                throw "jqxGrid: Missing reference to jqxdata.export.js!"
            }
            if (A == undefined) {
                A = true
            }
            var K = this;
            if (q == undefined) {
                var q = this.getrows();
                if (q.length == 0) {
                    throw "No data to export."
                }
            }
            this.exporting = true;
            if (!this.pageable) {
                this.loadondemand = true
            }
            if (this.altrows) {
                this._renderrows(this.virtualsizeinfo)
            }
            var H = t != undefined ? t: false;
            var G = {};
            var p = {};
            var x = [];
            var n = this.host.find(".jqx-grid-cell:first");
            var y = this.host.find(".jqx-grid-cell-alt:first");
            n.removeClass(this.toThemeProperty("jqx-grid-cell-selected"));
            n.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
            y.removeClass(this.toThemeProperty("jqx-grid-cell-selected"));
            y.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
            n.removeClass(this.toThemeProperty("jqx-grid-cell-hover"));
            n.removeClass(this.toThemeProperty("jqx-fill-state-hover"));
            y.removeClass(this.toThemeProperty("jqx-grid-cell-hover"));
            y.removeClass(this.toThemeProperty("jqx-fill-state-hover"));
            var k = "cell";
            var g = 1;
            var I = "column";
            var e = 1;
            var l = [];
            for (var D = 0; D < this.columns.records.length; D++) {
                var f = this.columns.records[D];
                if (f.cellclassname != "") {
                    f.customCellStyles = new Array();
                    if (typeof f.cellclassname == "string") {
                        for (var E = 0; E < q.length; E++) {
                            f.customCellStyles[E] = f.cellclassname
                        }
                    } else {
                        for (var E = 0; E < q.length; E++) {
                            var w = this.getrowboundindex(E);
                            var d = f.cellclassname(w, f.displayfield, q[E][f.displayfield], q[E]);
                            if (d) {
                                f.customCellStyles[E] = d
                            }
                        }
                    }
                }
            }
            var z = new Array();
            var J = null;
            var c = null;
            var b = null;
            a.each(this.columns.records,
            function(N) {
                var Q = a(K.table[0].rows[0].cells[N]);
                if (K.table[0].rows.length > 1) {
                    var j = a(K.table[0].rows[1].cells[N]);
                    if (!b) {
                        b = j
                    }
                }
                if (!c) {
                    c = Q
                }
                var M = this;
                var O = function(S) {
                    S.removeClass(K.toThemeProperty("jqx-grid-cell-selected"));
                    S.removeClass(K.toThemeProperty("jqx-fill-state-pressed"));
                    S.removeClass(K.toThemeProperty("jqx-grid-cell-hover"));
                    S.removeClass(K.toThemeProperty("jqx-fill-state-hover"));
                    if (M.customCellStyles) {
                        for (var T in M.customCellStyles) {
                            S.removeClass(M.customCellStyles[T])
                        }
                    }
                };
                O(Q);
                if (j) {
                    O(j)
                }
                if (this.displayfield == null) {
                    return true
                }
                if (K.showaggregates) {
                    if (K.getcolumnaggregateddata) {
                        l.push(K.getcolumnaggregateddata(this.displayfield, this.aggregates, true, q))
                    }
                }
                var P = K._getexportcolumntype(this);
                if (this.exportable && (!this.hidden || H)) {
                    G[this.displayfield] = {};
                    G[this.displayfield].text = this.text;
                    G[this.displayfield].width = parseInt(this.width);
                    if (isNaN(G[this.displayfield].width)) {
                        G[this.displayfield].width = 60
                    }
                    G[this.displayfield].formatString = this.cellsformat;
                    G[this.displayfield].localization = K.gridlocalization;
                    G[this.displayfield].type = P;
                    G[this.displayfield].cellsAlign = this.cellsalign;
                    G[this.displayfield].hidden = !A;
                    G[this.displayfield].displayfield = this.displayfield;
                    z.push(G[this.displayfield])
                }
                k = "cell" + g;
                var R = a(this.element);
                if (this.element == undefined) {
                    R = a(this.uielement)
                }
                if (!J) {
                    J = R
                } else {
                    if (!M._rendered) {
                        R = J;
                        Q = c;
                        j = b
                    }
                }
                I = "column" + e;
                if (s == "html" || s == "xls" || s == "pdf") {
                    var i = function(S, aa, Z, T, Y, V, U, W, X) {
                        p[S] = {};
                        if (aa == undefined) {
                            return
                        }
                        p[S]["font-size"] = aa.css("font-size");
                        p[S]["font-weight"] = aa.css("font-weight");
                        p[S]["font-style"] = aa.css("font-style");
                        p[S]["background-color"] = V._getexportcolor(aa.css("background-color"));
                        p[S]["color"] = V._getexportcolor(aa.css("color"));
                        p[S]["border-color"] = V._getexportcolor(aa.css("border-top-color"));
                        if (Z) {
                            p[S]["text-align"] = Y.align
                        } else {
                            p[S]["text-align"] = Y.cellsalign;
                            p[S]["formatString"] = Y.cellsformat;
                            p[S]["dataType"] = P
                        }
                        if (s == "html" || s == "pdf") {
                            p[S]["border-top-width"] = aa.css("border-top-width");
                            p[S]["border-left-width"] = aa.css("border-left-width");
                            p[S]["border-right-width"] = aa.css("border-right-width");
                            p[S]["border-bottom-width"] = aa.css("border-bottom-width");
                            p[S]["border-top-style"] = aa.css("border-top-style");
                            p[S]["border-left-style"] = aa.css("border-left-style");
                            p[S]["border-right-style"] = aa.css("border-right-style");
                            p[S]["border-bottom-style"] = aa.css("border-bottom-style");
                            if (Z) {
                                if (U == 0) {
                                    p[S]["border-left-width"] = aa.css("border-right-width")
                                }
                                p[S]["border-top-width"] = aa.css("border-right-width");
                                p[S]["border-bottom-width"] = aa.css("border-bottom-width")
                            } else {
                                if (U == 0) {
                                    p[S]["border-left-width"] = aa.css("border-right-width")
                                }
                            }
                            p[S]["height"] = aa.css("height")
                        }
                        if (Y.exportable && (!Y.hidden || H)) {
                            if (W == true) {
                                if (!G[Y.displayfield].customCellStyles) {
                                    G[Y.displayfield].customCellStyles = new Array()
                                }
                                G[Y.displayfield].customCellStyles[X] = S
                            } else {
                                if (Z) {
                                    G[Y.displayfield].style = S
                                } else {
                                    if (!T) {
                                        G[Y.displayfield].cellStyle = S
                                    } else {
                                        G[Y.displayfield].cellAltStyle = S
                                    }
                                }
                            }
                        }
                    };
                    i(I, R, true, false, this, K, N);
                    e++;
                    i(k, Q, false, false, this, K, N);
                    if (K.altrows) {
                        k = "cellalt" + g;
                        i(k, j, false, true, this, K, N)
                    }
                    if (this.customCellStyles) {
                        for (var L in M.customCellStyles) {
                            Q.removeClass(M.customCellStyles[L])
                        }
                        for (var L in M.customCellStyles) {
                            Q.addClass(M.customCellStyles[L]);
                            i(k + M.customCellStyles[L], Q, false, false, this, K, N, true, L);
                            Q.removeClass(M.customCellStyles[L])
                        }
                    }
                    g++
                }
            });
            a.each(this.columns.records,
            function(i) {
                if (G[this.displayfield]) {
                    G[this.displayfield].columnsDataFields = z
                }
            });
            if (this.showaggregates) {
                var F = [];
                var C = s == "xls" ? "_AG": "";
                var m = this.groupable ? this.groups.length: 0;
                if (this.rowdetails) {
                    m++
                }
                if (l.length > 0) {
                    a.each(this.columns.records,
                    function(j) {
                        if (this.aggregates) {
                            for (var M = 0; M < this.aggregates.length; M++) {
                                if (!F[M]) {
                                    F[M] = {}
                                }
                                if (F[M]) {
                                    var N = K._getaggregatename(this.aggregates[M]);
                                    var O = K._getaggregatetype(this.aggregates[M]);
                                    var L = l[j - m];
                                    if (L) {
                                        F[M][this.displayfield] = C + N + ": " + L[O]
                                    }
                                }
                            }
                        }
                    });
                    a.each(this.columns.records,
                    function(j) {
                        for (var L = 0; L < F.length; L++) {
                            if (F[L][this.displayfield] == undefined) {
                                F[L][this.displayfield] = C
                            }
                        }
                    })
                }
                a.each(F,
                function() {
                    q.push(this)
                })
            }
            var o = this;
            var u = a.jqx.dataAdapter.ArrayExporter(q, G, p);
            if (B == undefined) {
                this._renderrows(this.virtualsizeinfo);
                var r = u.exportTo(s);
                if (this.showaggregates) {
                    a.each(F,
                    function() {
                        q.pop(this)
                    })
                }
                setTimeout(function() {
                    o.exporting = false
                },
                50);
                return r
            } else {
                u.exportToFile(s, B, v, h)
            }
            if (this.showaggregates) {
                a.each(F,
                function() {
                    q.pop(this)
                })
            }
            this._renderrows(this.virtualsizeinfo);
            setTimeout(function() {
                o.exporting = false
            },
            50)
        },
        _getexportcolor: function(l) {
            var f = l;
            if (l == "transparent") {
                f = "#FFFFFF"
            }
            if (!f || !f.toString()) {
                f = "#FFFFFF"
            }
            if (f.toString().indexOf("rgb") != -1) {
                var i = f.split(",");
                if (f.toString().indexOf("rgba") != -1) {
                    var d = parseInt(i[0].substring(5));
                    var h = parseInt(i[1]);
                    var j = parseInt(i[2]);
                    var k = parseInt(i[3].substring(1, 4));
                    var m = {
                        r: d,
                        g: h,
                        b: j
                    };
                    var e = this._rgbToHex(m);
                    if (d == 0 && h == 0 && j == 0 && k == 0) {
                        return "#ffffff"
                    }
                    return "#" + e
                }
                var d = parseInt(i[0].substring(4));
                var h = parseInt(i[1]);
                var j = parseInt(i[2].substring(1, 4));
                var m = {
                    r: d,
                    g: h,
                    b: j
                };
                var e = this._rgbToHex(m);
                return "#" + e
            } else {
                if (f.toString().indexOf("#") != -1) {
                    if (f.toString().length == 4) {
                        var c = f.toString().substring(1, 4);
                        f += c
                    }
                }
            }
            return f
        },
        _rgbToHex: function(b) {
            return this._intToHex(b.r) + this._intToHex(b.g) + this._intToHex(b.b)
        },
        _intToHex: function(c) {
            var b = (parseInt(c).toString(16));
            if (b.length == 1) {
                b = ("0" + b)
            }
            return b.toUpperCase()
        },
        _getexportcolumntype: function(f) {
            var g = this;
            var e = "string";
            var d = g.source.datafields || ((g.source._source) ? g.source._source.datafields: null);
            if (d) {
                var i = "";
                a.each(d,
                function() {
                    if (this.name == f.displayfield) {
                        if (this.type) {
                            i = this.type
                        }
                        return false
                    }
                });
                if (i) {
                    return i
                }
            }
            if (f != null) {
                if (this.dataview.cachedrecords == undefined) {
                    return e
                }
                var b = null;
                if (!this.virtualmode) {
                    if (this.dataview.cachedrecords.length == 0) {
                        return e
                    }
                    b = this.dataview.cachedrecords[0][f.displayfield];
                    if (b != null && b.toString() == "") {
                        return "string"
                    }
                } else {
                    a.each(this.dataview.cachedrecords,
                    function() {
                        b = this[f.displayfield];
                        return false
                    })
                }
                if (b != null) {
                    if (f.cellsformat.indexOf("c") != -1) {
                        return "number"
                    }
                    if (f.cellsformat.indexOf("n") != -1) {
                        return "number"
                    }
                    if (f.cellsformat.indexOf("p") != -1) {
                        return "number"
                    }
                    if (f.cellsformat.indexOf("d") != -1) {
                        return "date"
                    }
                    if (f.cellsformat.indexOf("y") != -1) {
                        return "date"
                    }
                    if (f.cellsformat.indexOf("M") != -1) {
                        return "date"
                    }
                    if (f.cellsformat.indexOf("m") != -1) {
                        return "date"
                    }
                    if (f.cellsformat.indexOf("t") != -1) {
                        return "date"
                    }
                    if (typeof b == "boolean") {
                        e = "boolean"
                    } else {
                        if (a.jqx.dataFormat.isNumber(b)) {
                            e = "number"
                        } else {
                            var h = new Date(b);
                            if (h.toString() == "NaN" || h.toString() == "Invalid Date") {
                                if (a.jqx.dataFormat) {
                                    h = a.jqx.dataFormat.tryparsedate(b);
                                    if (h != null) {
                                        if (h && h.getFullYear()) {
                                            if (h.getFullYear() == 1970 && h.getMonth() == 0 && h.getDate() == 1) {
                                                var c = new Number(b);
                                                if (!isNaN(c)) {
                                                    return "number"
                                                }
                                                return "string"
                                            }
                                        }
                                        return "date"
                                    } else {
                                        e = "string"
                                    }
                                } else {
                                    e = "string"
                                }
                            } else {
                                e = "date"
                            }
                        }
                    }
                }
            }
            return e
        }
    })
})(jqxBaseFramework);