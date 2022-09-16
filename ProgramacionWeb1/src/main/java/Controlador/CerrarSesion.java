/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controlador;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "CerrarSesion", urlPatterns = {"/CerrarSesion"})
public class CerrarSesion extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        HttpSession session = request.getSession();

        try {
            session.setAttribute("usuario", null);
            session.invalidate();
            resultado.put("resultado", true);
        } catch (Exception ex) {
            System.out.print(ex);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }
}
