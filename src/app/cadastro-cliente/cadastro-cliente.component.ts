import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../models/cliente';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  constructor(private clienteService: ClientesService) { }

  cliente = {} as Cliente;
  clientes: Cliente[] = [];


  ngOnInit(): void {
  }


  CriaCliente(form: NgForm) {
    console.log(NgForm)
    if (this.cliente.id !== undefined) {
      this.clienteService.putCliente(this.cliente).subscribe(() => {
        // this.cleanForm(form);
      });
    } else {
      this.clienteService.postCliente(this.cliente).subscribe(() => {
        // this.cleanForm(form);
      });
    }
  }

      // limpa o formulario
  cleanForm(form: NgForm) {
    // this.getClientes();
    form.resetForm();
    this.cliente = {} as Cliente;
  }

}
