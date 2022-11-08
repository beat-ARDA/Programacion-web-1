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
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.File;
import java.util.HashMap;
import java.util.Objects;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "ActualizarPublicacion", urlPatterns = {"/ActualizarPublicacion"})
@MultipartConfig(maxFileSize = 16177216)
public class ActualizarPublicacion extends HttpServlet {

    private String extractExtension(Part part) {
        String content = part.getHeader("content-disposition");
        String[] items = content.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                String filename = s.substring(s.indexOf("=") + 2, s.length() - 1);
                if (filename.isEmpty() || filename.isBlank()) {
                    return filename;
                }
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

        int id = Integer.parseInt(request.getParameter("id"));
        String descripcion = request.getParameter("descripcion");
        Part imagen = request.getPart("imagen");
        String texto = request.getParameter("texto");
        String titulo = request.getParameter("titulo");
        String _spoiler = request.getParameter("spoiler");
        int spoiler = 1;

        if (Objects.isNull(_spoiler)) {
            spoiler = 0;
        }

        String foto = "";
        String imagenVacio = extractExtension(imagen);
        if (!imagenVacio.isBlank() && !imagenVacio.isEmpty()) {
            String nombreArchivo = String.valueOf(System.currentTimeMillis());
            imagen.write(uploadPath + "/" + nombreArchivo + extractExtension(imagen));

            foto = "publicacionesImg/" + nombreArchivo + extractExtension(imagen);
        }

        Publicacion publicacion = new Publicacion(descripcion, foto, texto, titulo, spoiler);
        Publicacion publicacionId = new Publicacion(id);

        if (publicacionDao.updatePublicacion(publicacion, publicacionId)) {
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
