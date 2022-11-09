/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Interfaces;

import Model.VotoPublicacion;

/**
 *
 * @author e-arduron
 */
public interface VotoPublicacionCRUD {

    public boolean insertVoto(VotoPublicacion voto);

    public boolean deleteVoto(VotoPublicacion voto);

    public int getVotosPublicacion(VotoPublicacion voto);

    public boolean getVotoPublicacion(VotoPublicacion voto);
}
