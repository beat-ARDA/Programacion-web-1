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
        String sql = "select id, texto, imagen, spoiler, fecha_creacion, eliminada, descripcion, titulo, idusuarios, num_comentarios from publicaciones where idusuarios = " + user.getIdusuario() + " limit " + initialLimit + " offset " + nextLimit + ";";
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
                        rs.getInt("num_comentarios")
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
    public int insertPublicacion(Publicacion publicacion) {
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
                + "'" + publicacion.getSpoiler() + "',\n"
                + "'" + publicacion.getDescripcion() + "',\n"
                + "'" + publicacion.getTitulo() + "',\n"
                + "'" + publicacion.getIdUsuarios() + "');";

        String sqlGetId = "select id from publicaciones order by id desc limit 1;";

        try {
            con = cn.getConnection();
            ps = con.prepareStatement(sql);
            int resultado = ps.executeUpdate();

            if (resultado > 0) {
                ps = con.prepareStatement(sqlGetId);
                rs = ps.executeQuery();
                int res = -1;
                if (rs.next()) {
                    res = rs.getInt("id");
                }

                return res;
            } else {
                return -1;
            }
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
            return -1;
        }
    }

    @Override
    public boolean updatePublicacion(Publicacion publicacion, Publicacion id) {
        String sqlImagen = "update publicaciones set texto = '" + publicacion.getTexto() + "', imagen = '" + publicacion.getImagen() + "', spoiler = " + publicacion.getSpoiler() + ", descripcion = '" + publicacion.getDescripcion() + "', \n"
                + "titulo = '" + publicacion.getTitulo() + "' where id = " + id.getId() + ";";

        String sqlNoImagen = "update publicaciones set texto = '" + publicacion.getTexto() + "', spoiler = " + publicacion.getSpoiler() + ", descripcion = '" + publicacion.getDescripcion() + "', \n"
                + "titulo = '" + publicacion.getTitulo() + "' where id = " + id.getId() + ";";

        String sql = "";
        if (publicacion.getImagen().isBlank() || publicacion.getImagen().isEmpty()) {
            sql = sqlNoImagen;
        } else {
            sql = sqlImagen;
        }

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
        String sql = "select id, texto, imagen, spoiler, fecha_creacion, eliminada, descripcion, titulo, idusuarios, num_comentarios from publicaciones where id = '" + _publicacion.getId() + "' AND idusuarios = '" + _publicacion.getIdUsuarios() + "';";
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
                        rs.getInt("num_comentarios")
                );
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return publicacion;
    }

    @Override
    public List selectPublicaciones(int initialLimit, int nextLimit) {
        List<Publicacion> listaPublicaciones = new ArrayList<Publicacion>();
        String sql = "select id, texto, imagen, spoiler, fecha_creacion, eliminada, descripcion, titulo, idusuarios, num_comentarios from publicaciones limit " + initialLimit + " offset " + nextLimit + ";";
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
                        rs.getInt("num_comentarios")
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
    public int selectCount() {
        int cantidad = 0;
        String sql = "select count(*) from publicaciones;";
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
    public List searchPublicaciones(String valorBusqueda, int initialLimit, int nextLimit) {
        List<Publicacion> listaPublicaciones = new ArrayList<>();
        String sql = "select id, texto, imagen, spoiler, fecha_creacion, eliminada, descripcion, titulo, idusuarios, num_comentarios from publicaciones where INSTR(texto, '" + valorBusqueda + "') > 0 or INSTR(titulo, '" + valorBusqueda + "') > 0 limit " + initialLimit + " offset " + nextLimit + ";";
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
                        rs.getInt("num_comentarios")
                );

                listaPublicaciones.add(publicacion);
            }
            rs.close();
        } catch (SQLException ex) {
            System.out.print("Error " + ex);
        }
        return listaPublicaciones;
    }
}
