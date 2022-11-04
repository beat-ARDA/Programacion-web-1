/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.PublicacionDAO;
import Model.Publicacion;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Objects;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.http.Part;
import java.io.File;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "InsertarPublicacion", urlPatterns = {"/InsertarPublicacion"})
@MultipartConfig(maxFileSize = 16177216)
public class InsertarPublicacion extends HttpServlet {

    private String extractExtension(Part part) {
        String content = part.getHeader("content-disposition");
        String[] items = content.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                String filename = s.substring(s.indexOf("=") + 2, s.length() - 1);
                String subs = "";
                subs = filename.substring(filename.indexOf("."), filename.length());
                return subs;
            }
        }
        return "";
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        PublicacionDAO publicacionDao = new PublicacionDAO();
        String uploadPath = getServletContext().getRealPath("/publicacionesImg/");

        File fdir = new File(uploadPath);
        boolean comprobar = false;
        comprobar = fdir.exists();

        if (!comprobar) {
            fdir.mkdir();
        }

        int idusuarios = Integer.parseInt(request.getParameter("idusuarios"));
        String descripcion = request.getParameter("descripcion");
        Part imagen = request.getPart("imagen");
        String texto = request.getParameter("texto");
        String titulo = request.getParameter("titulo");
        String _spoiler = request.getParameter("spoiler");

        int spoiler = 1;

        if (Objects.isNull(_spoiler) || _spoiler.isBlank() || _spoiler.isEmpty()) {
            spoiler = 0;
        }

        String nombreArchivo = String.valueOf(System.currentTimeMillis());
        imagen.write(uploadPath + "/" + nombreArchivo + extractExtension(imagen));

        String foto = "publicacionesImg/" + nombreArchivo + extractExtension(imagen);

        Publicacion publicacion = new Publicacion(
                idusuarios,
                descripcion,
                foto,
                texto,
                titulo,
                spoiler,
                0,
                0
        );

        if (publicacionDao.insertPublicacion(publicacion)) {
            resultado.put("resultado", true);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }

}
