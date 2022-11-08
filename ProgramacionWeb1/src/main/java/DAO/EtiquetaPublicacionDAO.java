/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Config.Conexion;
import Interfaces.EtiquetaPublicacionCRUD;
import Model.EtiquetaPublicacion;
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
public class EtiquetaPublicacionDAO implements EtiquetaPublicacionCRUD {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    EtiquetaPublicacion _etiquetaPublicacion;

    @Override
    public boolean insertEtiquetaPublicacion(EtiquetaPublicacion etiquetaPublicacion) {
        String sql = "insert into etiquetapublicacion\n"
                + " (\n"
                + "idEtiqueta, \n"
                + "idPubli\n"
                + ")\n"
                + " VALUES\n"
                + " (\n"
                + "'" + etiquetaPublicacion.getIdEtiqueta() + "', \n"
                + "'" + etiquetaPublicacion.getIdPubli() + "'\n"
                + ");";

        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);
            int resultado = ps.executeUpdate();

            if (resultado > 0) {
                return true;
            } else {
                return false;
            }
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
            return false;
        }
    }

    @Override
    public List selectEtiquetasId(EtiquetaPublicacion etiquetaPublicacion) {
        List<EtiquetaPublicacion> listaEtiquetaPublicacion = new ArrayList<>();
        String sql = "select id, idEtiqueta, idPubli from etiquetapublicacion where idPubli = " + etiquetaPublicacion.getIdEtiqueta() + ";";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            while (rs.next()) {
                _etiquetaPublicacion = new EtiquetaPublicacion(
                        rs.getInt("id"),
                        rs.getInt("idPubli"),
                        rs.getInt("idEtiqueta")
                );

                listaEtiquetaPublicacion.add(_etiquetaPublicacion);
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return listaEtiquetaPublicacion;
    }

    @Override
    public boolean deleteEtiquetaPublicacion(EtiquetaPublicacion ep) {
        String sql = "delete from etiquetapublicacion where idPubli = " + ep.getIdPubli() + ";";

        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);
            int resultado = ps.executeUpdate();

            if (resultado > 0) {
                return true;
            } else {
                return false;
            }
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
            return false;
        }
    }
}
