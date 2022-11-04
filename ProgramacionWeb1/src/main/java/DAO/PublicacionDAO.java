package DAO;

import Config.Conexion;
import Interfaces.PublicacionCRUD;
import Model.Publicacion;
import Model.Usuarios;
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
public class PublicacionDAO implements PublicacionCRUD {

    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    Publicacion publicacion;

    @Override
    public int selectCount(Usuarios user) {
        int cantidad = 0;
        String sql = "select count(*) from publicaciones where idusuarios = '" + user.getIdusuario() + "';";
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
    public List selectPublicacionesUsuario(Usuarios user, int initialLimit, int nextLimit) {
        List<Publicacion> listaPublicaciones = new ArrayList<Publicacion>();
        String sql = "select id, texto, imagen, spoiler, fecha_creacion, eliminada, descripcion, titulo, idusuarios, num_comentarios, num_votos from publicaciones where idusuarios = " + user.getIdusuario() + " limit " + initialLimit + " offset " + nextLimit + ";";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            while (rs.next()) {
                publicacion = new Publicacion(
                        rs.getInt("id"),
                        rs.getInt("idusuarios"),
                        rs.getString("descripcion"),
                        rs.getString("fecha_creacion"),
                        rs.getString("imagen"),
                        rs.getString("texto"),
                        rs.getString("titulo"),
                        rs.getInt("eliminada"),
                        rs.getInt("spoiler"),
                        rs.getInt("num_comentarios"),
                        rs.getInt("num_votos")
                );

                listaPublicaciones.add(publicacion);
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return listaPublicaciones;
    }

    @Override
    public boolean insertPublicacion(Publicacion publicacion) {
        String sql = "INSERT INTO publicaciones\n"
                + " (\n"
                + "texto,\n"
                + "imagen,\n"
                + "spoiler,\n"
                + "descripcion,\n"
                + "titulo,\n"
                + "idusuarios)\n"
                + " VALUES\n"
                + " (\n"
                + "'" + publicacion.getTexto() + "',\n"
                + "'" + publicacion.getImagen() + "',\n"
                //+ "LOAD_FILE('" + publicacion.getImagen() + "'),\n"
                + "'" + publicacion.getSpoiler() + "',\n"
                + "'" + publicacion.getDescripcion() + "',\n"
                + "'" + publicacion.getTitulo() + "',\n"
                + "'" + publicacion.getIdUsuarios() + "');";

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
    public boolean updatePublicacion(Publicacion publicacion, Publicacion id) {
        String sql = "update publicaciones set texto = '" + publicacion.getTexto() + "', imagen = '" + publicacion.getImagen() + "', spoiler = " + publicacion.getSpoiler() + ", descripcion = '" + publicacion.getDescripcion() + "', \n"
                + "titulo = '" + publicacion.getTitulo() + "' where id = " + id.getId() + ";";

        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);
            int resultado = ps.executeUpdate();

            if (resultado > 0) {
                return true;
            } else {
                System.out.print(resultado);
                return false;
            }
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
            return false;
        }
    }

    @Override
    public boolean deletePublicacion(Publicacion publicacion) {
        String sql = "delete from publicaciones where id = " + publicacion.getId() + ";";

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
    public Publicacion selectPublicacionUsuario(Publicacion _publicacion) {
        String sql = "select id, texto, imagen, spoiler, fecha_creacion, eliminada, descripcion, titulo, idusuarios, num_comentarios, num_votos from publicaciones where id = '" + _publicacion.getId() + "' AND idusuarios = '" + _publicacion.getIdUsuarios() + "';";
        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);

            rs = ps.executeQuery(sql);

            if (rs.next()) {
                publicacion = new Publicacion(
                        rs.getInt("id"),
                        rs.getInt("idusuarios"),
                        rs.getString("descripcion"),
                        rs.getString("fecha_creacion"),
                        rs.getString("imagen"),
                        rs.getString("texto"),
                        rs.getString("titulo"),
                        rs.getInt("eliminada"),
                        rs.getInt("spoiler"),
                        rs.getInt("num_comentarios"),
                        rs.getInt("num_votos")
                );
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return publicacion;
    }
}
