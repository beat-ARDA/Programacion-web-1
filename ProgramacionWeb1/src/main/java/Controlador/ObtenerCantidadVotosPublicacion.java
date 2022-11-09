/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.PublicacionDAO;
import DAO.VotoPublicacionDAO;
import Model.Usuarios;
import Model.VotoPublicacion;
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
@WebServlet(name = "ObtenerCantidadVotosPublicacion", urlPatterns = {"/ObtenerCantidadVotosPublicacion"})
public class ObtenerCantidadVotosPublicacion extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        VotoPublicacionDAO votoPublicacionDao = new VotoPublicacionDAO();
        int cantidad = 0;
        int idPublicacion = Integer.parseInt(request.getParameter("idPublicacion"));
        VotoPublicacion voto = new VotoPublicacion(idPublicacion);

        cantidad = votoPublicacionDao.getVotosPublicacion(voto);

        if (cantidad > 0) {
            resultado.put("resultado", cantidad);
        } else {
            resultado.put("resultado", 0);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }
}
