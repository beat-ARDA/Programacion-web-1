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

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "ObtenerPublicacion", urlPatterns = {"/ObtenerPublicacion"})
public class ObtenerPublicacion extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Publicacion publicacionResult = new Publicacion();
        HashMap resultado = new HashMap();
        PublicacionDAO publicacionDao = new PublicacionDAO();
        String _userId = request.getParameter("userId");
        String _publicacionId = request.getParameter("publicacionId");
        int userId = -1;
        int publicacionId = -1;
        if(_userId != null)
        {
            userId = Integer.parseInt(_userId);
        }
        if(_publicacionId != null)
        {
            publicacionId = Integer.parseInt(_publicacionId);
        }
        Publicacion publicacion = new Publicacion(publicacionId, userId);

        publicacionResult = publicacionDao.selectPublicacionUsuario(publicacion);

        if (publicacionResult != null) {
            resultado.put("resultado", publicacionResult);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        
    }
}
