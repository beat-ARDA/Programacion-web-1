/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import DAO.PublicacionDAO;
import Model.Publicacion;
import Model.Usuarios;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "ObtenerPublicaciones", urlPatterns = {"/ObtenerPublicaciones"})
public class ObtenerPublicaciones extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Publicacion> listaPublicaciones = new ArrayList<Publicacion>();
        HashMap resultado = new HashMap();
        PublicacionDAO publicacionDao = new PublicacionDAO();
        String userId = request.getParameter("userId");
        String initialLimit = request.getParameter("initialLimit");
        String nextLimit = request.getParameter("nextLimit");
        int userid = -1;
        int _initialLimit = -1;
        int _nextLimit = -1;

        if (userId != null) {
            userid = Integer.parseInt(userId);
        }

        if (initialLimit != null) {
            _initialLimit = Integer.parseInt(initialLimit);
        }

        if (nextLimit != null) {
            _nextLimit = Integer.parseInt(nextLimit);
        }
        Usuarios user = new Usuarios(userid);

        listaPublicaciones = publicacionDao.selectPublicacionesUsuario(user, _initialLimit, _nextLimit);

        if (listaPublicaciones != null) {
            resultado.put("resultado", listaPublicaciones);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }

}
