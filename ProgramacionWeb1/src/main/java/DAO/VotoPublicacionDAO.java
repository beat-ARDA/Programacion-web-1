/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Config.Conexion;
import Interfaces.VotoPublicacionCRUD;
import Model.VotoPublicacion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author e-arduron
 */
public class VotoPublicacionDAO implements VotoPublicacionCRUD {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    VotoPublicacion _votoPublicaion;

    @Override
    public boolean insertVoto(VotoPublicacion voto) {
        String sql = "insert into votopublicacion (idUsuario, idPublicacion) values (" + voto.getIdUsuario() + ", " + voto.getIdPublicacion() + ");";

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
    public boolean deleteVoto(VotoPublicacion voto) {
        String sql = "delete from votopublicacion where idUsuario = " + voto.getIdUsuario() + " and idPublicacion = " + voto.getIdPublicacion() + ";";

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
    public int getVotosPublicacion(VotoPublicacion voto) {
        int cantidad = 0;
        String sql = "select count(*) from votopublicacion where idPublicacion = " + voto.getIdPublicacion() + ";";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            while (rs.next()) {
                cantidad = rs.getInt("count(*)");

            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return cantidad;
    }

    @Override
    public boolean getVotoPublicacion(VotoPublicacion voto) {
        int id = 0;
        boolean existe = false;
        String sql = "select id from votopublicacion where idUsuario = " + voto.getIdUsuario() + " and idPublicacion = " + voto.getIdPublicacion() + ";";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            while (rs.next()) {
                id = rs.getInt("id");
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        if (id > 0) {
            existe = true;
        }
        return existe;
    }
}
