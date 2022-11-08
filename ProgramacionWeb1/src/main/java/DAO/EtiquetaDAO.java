/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Config.Conexion;
import Interfaces.EtiquetaCRUD;
import Model.Etiqueta;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author e-arduron
 */
public class EtiquetaDAO implements EtiquetaCRUD {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    Etiqueta _etiqueta;

    @Override
    public List getEtiquetas() {
        List<Etiqueta> listaEtiquetas = new ArrayList<>();
        String sql = "select id, etiqueta from etiquetas;";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            while (rs.next()) {
                _etiqueta = new Etiqueta(
                        rs.getInt("id"),
                        rs.getString("etiqueta")
                );

                listaEtiquetas.add(_etiqueta);
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return listaEtiquetas;
    }

    @Override
    public List getEtiquetasById(Etiqueta etiqueta) {
        List<Etiqueta> listaEtiquetas = new ArrayList<>();
        String sql = "select id, etiqueta from etiquetas where id = '" + etiqueta.getId() + "';";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            while (rs.next()) {
                _etiqueta = new Etiqueta(
                        rs.getInt("id"),
                        rs.getString("etiqueta")
                );

                listaEtiquetas.add(_etiqueta);
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return listaEtiquetas;
    }
}
