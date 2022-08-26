import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../models/cliente';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  cliente = {} as Cliente;
  clientes: Cliente[] = [];

  confirmacaoDelete = false;

  constructor(private clienteService: ClientesService) { }


  ngOnInit() {
    this.getClientes();

  }

  getClientes() {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      console.log(this.clientes)
    });
  }

  deleteCliente(id: any) {
    this.clienteService.deleteCliente(id).subscribe(
      res => {
        this.confirmacaoDelete = true;
        console.log('Cliente Deletado com Sucesso');
        this.getClientes();
        setTimeout(() => { this.confirmacaoDelete = false; }, 5000)
      }
    )
  
  }

  // setCurrentCliente(cliente: any, index: any) {
  //   this.currentCliente = cliente;
  //   this.currentIndex = index;
  // }

}
