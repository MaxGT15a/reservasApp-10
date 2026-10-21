import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../core/services/theme.service';
import { AuthService } from '../core/services/auth.service';
import { ROLES } from '../core/models/usuario.model';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  disponible: boolean;
}

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  sidenavAbierto = true;
  isAdmin = false;
  username: string | null = null;

// layout.component.ts (ejemplo de cómo debes tener estructurado tu arreglo)

menuItems = [
  { label: 'Dashboard', route: '/dashboard', icon: 'dashboard', disponible: true },
  { label: 'Reservas', route: '/reservas', icon: 'book_online', disponible: true },
  { label: 'Habitaciones', route: '/habitaciones', icon: 'meeting_room', disponible: true },
  { label: 'Huéspedes', route: '/huespedes', icon: 'people', disponible: true },
  { label: 'Usuarios', route: '/usuarios', icon: 'admin_panel_settings', disponible: true }
];

  constructor(
    public themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.username = this.authService.getUsername();
  }

  toggleSidenav(): void {
    this.sidenavAbierto = !this.sidenavAbierto;
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}