/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.EtiquetaPublicacionDAO;
import Model.EtiquetaPublicacion;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "EliminarEtiquetaPublicacion", urlPatterns = {"/EliminarEtiquetaPublicacion"})
public class EliminarEtiquetaPublicacion extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        EtiquetaPublicacionDAO etiquetaPublicacionDao = new EtiquetaPublicacionDAO();
        int idPubli = Integer.parseInt(request.getParameter("idPubli"));
        int idEtiqueta = Integer.parseInt(request.getParameter("idEtiqueta"));

        EtiquetaPublicacion etiquetaPublicacion = new EtiquetaPublicacion(idPubli, idEtiqueta);

        Boolean respuestaUsuario = etiquetaPublicacionDao.deleteEtiquetaPublicacion(etiquetaPublicacion);

        if (respuestaUsuario) {
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
