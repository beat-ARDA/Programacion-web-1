/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Config.Conexion;
import Interfaces.ComentariosCRUD;
import Model.Comentarios;
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
public class ComentariosDAO implements ComentariosCRUD {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    Comentarios _comentario;

    @Override
    public boolean insertComentario(Comentarios comentario) {
        String sql = "insert into comentarios (comentario, idPublicacion, idUsuario) values ('" + comentario.getComentario() + "', " + comentario.getIdPub() + ", " + comentario.getIdUsu() + ");";
        String sqlIncrementComentario = "update publicaciones set num_comentarios = num_comentarios + 1 where id = " + comentario.getIdPub() + ";";

        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);
            int resultado1 = ps.executeUpdate();

            ps = con.prepareStatement(sqlIncrementComentario);
            int resultado2 = ps.executeUpdate();

            if (resultado1 > 0 && resultado2 > 0) {
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
    public List GetComentarios(Comentarios comentario) {
        List<Comentarios> listaComentarios = new ArrayList<Comentarios>();
        String sql = "select id, comentario, idPublicacion, idUsuario from comentarios where idPublicacion = " + comentario.getIdPub() + ";";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            while (rs.next()) {
                _comentario = new Comentarios(
                        rs.getInt("id"),
                        rs.getInt("idPublicacion"),
                        rs.getInt("idUsuario"),
                        rs.getString("comentario")
                );

                listaComentarios.add(_comentario);
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return listaComentarios;
    }

    @Override
    public int GetCountComentarios(Comentarios comentario) {
        int cantidad = 0;
        String sql = "select count(*) from comentarios where idPublicacion = " + comentario.getIdPub() + ";";
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

}
