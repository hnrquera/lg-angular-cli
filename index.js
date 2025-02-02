#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

// Templates content
const HTML_CONTENT = `<mat-toolbar class="toolbar-container">
  <button mat-icon-button class="toolbar-icon" aria-label="Example icon-button with menu icon" (click)="drawer.toggle()">
    <mat-icon>menu</mat-icon>
  </button>
  <span class="title">Sidebar Layout Example</span>
  <span class="toolbar-spacer"></span>
  <button mat-icon-button class="toolbar-icon" aria-label="Example icon-button with share icon">
    <mat-icon>logout</mat-icon>
  </button>
</mat-toolbar>
<mat-drawer-container class="container" autosize>
  <mat-drawer #drawer [opened]="true" class="sidenav" [mode]="sidenavMode">
    <div class="logo-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png" alt="Logo" class="logo">
    </div>
    <mat-nav-list>
      @for (menu of menuItems; track $index) {
        <mat-list-item [routerLink]="menu.router" routerLinkActive #rla="routerLinkActive" [activated]="rla.isActive">
          <mat-icon matListItemIcon>{{menu.icon}}</mat-icon>
          <span matListItemTitle>
            {{menu.label}}
          </span>
        </mat-list-item>
      }
     </mat-nav-list>
  </mat-drawer>
  <div class="sidenav-content">
    <router-outlet></router-outlet>
  </div>
</mat-drawer-container>`;

const SCSS_CONTENT = `.toolbar-spacer {
  flex: 1 1 auto;
}
mat-toolbar.toolbar-container {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.203) !important;
  z-index: 1000;
  position: relative;
  .title {
    margin-left: 1rem;
  }
}
.container {
  width: 100vw;
  height: 93vh;
}
.sidenav {
  padding-left: 12px;
  padding-right: 12px;
  width: 240px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.314);
  border-radius: 0;
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #e0e0e0;
  }
  .logo {
    width: 72px; 
    height: 72px;
    object-fit: contain;
  }
}
.sidenav-content {
  height: 93vh;
  padding-top: 18px;
  padding-left: 12px;
  padding-right: 12px;
}`;

const TS_CONTENT = `import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  sidenavMode: 'over' | 'side' = 'side';
  private destroy$ = new Subject<void>();
  
  menuItems = [
    {label: 'Pagina 1', router: 'pagina1', icon: 'home'},
    {label: 'Pagina 2', router: 'pagina2', icon: 'apps'},
    {label: 'Pagina 3', router: 'pagina3', icon: 'settings'}
  ]

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: any) => {
        this.sidenavMode = result.matches ? 'over' : 'side';
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`;

// Command functions
function generateLayout() {
  console.log(chalk.blue('Gerando layout...'));
  
  try {
    // Procurar os arquivos do app.component
    const files = {
      html: path.join(process.cwd(), 'src/app/app.component.html'),
      scss: path.join(process.cwd(), 'src/app/app.component.scss'),
      ts: path.join(process.cwd(), 'src/app/app.component.ts')
    };

    // Verificar se os arquivos existem
    Object.entries(files).forEach(([type, file]) => {
      if (!fs.existsSync(file)) {
        throw new Error(`Arquivo ${file} não encontrado`);
      }
    });

    // Criar backups
    Object.entries(files).forEach(([type, file]) => {
      fs.copyFileSync(file, `${file}.backup`);
    });

    // Atualizar os arquivos
    fs.writeFileSync(files.html, HTML_CONTENT);
    fs.writeFileSync(files.scss, SCSS_CONTENT);
    fs.writeFileSync(files.ts, TS_CONTENT);

    console.log(chalk.green('✅ Layout gerado com sucesso!'));
    console.log(chalk.blue('Backups dos arquivos originais foram criados com extensão .backup'));
  } catch (error) {
    console.error(chalk.red('❌ Erro ao gerar layout:'), error.message);
    process.exit(1);
  }
}

function generateService(serviceName, options) {
  const servicesDir = path.join(process.cwd(), 'src/app/services');
  const serviceFolder = path.join(servicesDir, serviceName.toLowerCase());
  const serviceFile = path.join(serviceFolder, `${serviceName.toLowerCase()}.service.ts`);

  try {
    if (!fs.existsSync(servicesDir)) {
      fs.mkdirSync(servicesDir, { recursive: true });
    }

    if (!fs.existsSync(serviceFolder)) {
      fs.mkdirSync(serviceFolder);
    }

    let serviceContent = `import { inject, Injectable } from '@angular/core';\n`;

    if (options.http) {
      serviceContent += `import { HttpClient } from '@angular/common/http';\n`;
    }

    serviceContent += `
@Injectable({
  providedIn: 'root'
})
export class ${serviceName}Service {`;

    serviceContent += options.http ? `
  private http = inject(HttpClient);` : `
  constructor() { }`;

    if (options.http) {
      serviceContent += `

  // Configure sua URL base da API
  private readonly API_URL = 'sua_url_base_aqui';
  
  getAll() {
    return this.http.get<any[]>(this.API_URL);
  }

  getById(id: number) {
    return this.http.get<any>(\`\${this.API_URL}/\${id}\`);
  }

  create(data: any) {
    return this.http.post(this.API_URL, data);
  }

  update(id: number, data: any) {
    return this.http.put(\`\${this.API_URL}/\${id}\`, data);
  }

  delete(id: number) {
    return this.http.delete(\`\${this.API_URL}/\${id}\`);
  }`;
    }

    serviceContent += '\n}\n';

    fs.writeFileSync(serviceFile, serviceContent);
    console.log(chalk.green(`✅ Service criado em: ${serviceFile}`));
  } catch (error) {
    console.error(chalk.red('❌ Erro ao criar service:'), error.message);
    process.exit(1);
  }
}

// CLI Setup
program
  .name('lg-cli')
  .description('CLI para geração de layout e services no Angular')
  .version('1.0.0');

program
  .command('layout')
  .description('Gera um layout padrão no app.component')
  .action(generateLayout);

program
  .command('service')
  .description('Gera um service Angular')
  .argument('<name>', 'Nome do service')
  .option('--http', 'Adiciona métodos HTTP CRUD')
  .action((name, options) => {
    generateService(name, options);
  });

program.parse(process.argv);